#!/usr/bin/env python3
"""BoltSense edge publisher. A fake sensor is used ONLY with --simulate.

For hardware, write an adapter class with read() returning a dict of measured
metric names and pass --adapter module:ClassName. Never fabricate sensor values.
"""
import argparse
import importlib
import json
import os
import random
import signal
import ssl
import time
from datetime import datetime, timezone
from urllib.parse import urlparse
import paho.mqtt.client as mqtt

ALLOWED = {'temperatureC', 'vibrationRmsMmS', 'loadN', 'motorCurrentA', 'rpm', 'lubricationIndex'}

class MockBearingAdapter:
    """SIMULATED data only; intentionally no hardware interaction."""
    def read(self):
        return {
            'temperatureC': round(53.5 + random.uniform(-0.6, 0.6), 2),
            'vibrationRmsMmS': round(2.4 + random.uniform(-0.12, 0.12), 3),
        }

def load_adapter(spec):
    module, sep, name = spec.partition(':')
    if not sep:
        raise ValueError('Adapter must be given as module:ClassName')
    cls = getattr(importlib.import_module(module), name)
    adapter = cls()
    if not callable(getattr(adapter, 'read', None)):
        raise TypeError('Hardware adapter needs read() -> dict')
    return adapter

def validate_metrics(metrics):
    if not isinstance(metrics, dict) or not metrics:
        raise ValueError('Sensor adapter must return a nonempty dict')
    for key, value in metrics.items():
        if key not in ALLOWED or not isinstance(value, (int, float)) or isinstance(value, bool):
            raise ValueError(f'Unsupported or invalid metric: {key}')
    return metrics

def run():
    parser = argparse.ArgumentParser(description='BoltSense Raspberry Pi MQTT telemetry publisher')
    parser.add_argument('--machine-id', default='cnc-001')
    parser.add_argument('--component-id', default='spindle-bearing-01')
    parser.add_argument('--sensor-id', default='vibration-01')
    parser.add_argument('--broker', default=os.getenv('MQTT_URL', 'mqtt://localhost:1883'))
    parser.add_argument('--interval', type=float, default=1.0)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument('--simulate', action='store_true', help='Generate labeled MOCK telemetry, not a physical reading')
    source.add_argument('--adapter', help='Import a real configured sensor adapter, e.g. custom_sensor:BearingAdapter')
    args = parser.parse_args()
    if args.interval < 0.2:
        parser.error('--interval must be >= 0.2 seconds')
    adapter = MockBearingAdapter() if args.simulate else load_adapter(args.adapter)
    url = urlparse(args.broker)
    if url.scheme not in ('mqtt', 'mqtts'):
        parser.error('--broker must start with mqtt:// or mqtts://')
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=f'boltsense-pi-{os.getpid()}')
    username = os.getenv('MQTT_USERNAME')
    if username:
        client.username_pw_set(username, os.getenv('MQTT_PASSWORD'))
    if url.scheme == 'mqtts':
        client.tls_set(cert_reqs=ssl.CERT_REQUIRED)
    client.connect(url.hostname or 'localhost', url.port or (8883 if url.scheme == 'mqtts' else 1883), keepalive=60)
    client.loop_start()
    stop = False
    def stop_handler(_signum, _frame):
        nonlocal stop
        stop = True
    signal.signal(signal.SIGINT, stop_handler)
    signal.signal(signal.SIGTERM, stop_handler)
    topic = f'boltsense/{args.machine_id}/{args.component_id}/telemetry'
    print(f"Mode: {'SIMULATED / MOCK' if args.simulate else 'HARDWARE ADAPTER'} | Publishing to {topic}", flush=True)
    try:
        while not stop:
            metrics = validate_metrics(adapter.read())
            payload = {'schemaVersion': 1, 'machineId': args.machine_id, 'componentId': args.component_id,
                       'sensorId': args.sensor_id, 'timestamp': datetime.now(timezone.utc).isoformat().replace('+00:00','Z'),
                       'metrics': metrics}
            client.publish(topic, json.dumps(payload), qos=1)
            print(('SIMULATED ' if args.simulate else 'MEASURED ') + json.dumps(payload), flush=True)
            time.sleep(args.interval)
    finally:
        client.loop_stop()
        client.disconnect()

if __name__ == '__main__':
    run()
