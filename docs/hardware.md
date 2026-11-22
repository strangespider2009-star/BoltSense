# Hardware integration checklist

1. Decide what each component needs to measure: temperature, vibration, load/strain, current or speed. Only claim sensor-derived values when the hardware is physically installed, calibrated and tested.
2. Choose an actual industrial-grade sensor with appropriate voltage, isolation, range, sample frequency and manufacturer calibration procedures. Most analog industrial sensors require a suitable ADC/interface, as Raspberry Pi GPIO does not directly read analog voltage.
3. Wire sensors using the manufacturer's documentation with machinery isolated and under qualified personnel supervision. Keep monitoring equipment electrically independent of safety interlocks and motor controls.
4. Write `read()` hardware adapters that return real calibrated measurements with BoltSense units. Example temperature is °C; vibration is **velocity RMS in mm/s**, not raw acceleration; force is N. Do not substitute unconverted accelerometer values.
5. Register machine, component, sensor and hardware IDs in PostgreSQL; configure sample rate, calibration date and verified warning/critical thresholds in `Sensor.thresholds`.
6. Keep Raspberry Pi, broker, API and browser clocks synchronized. Confirm MQTT TLS/ACLs and avoid anonymous outside-network brokers.
7. Publish a single test channel, confirm backend validation and correct component mapping, and only then expand the sensor fleet.

**Important**: Lubrication degradation requires an appropriately validated measured indicator (e.g. real oil quality/particle sensor, lab analysis, or calibrated indirect measurements). A temperature or vibration sensor alone cannot directly measure lubricant chemistry. Similarly, clamping force cannot be stated as a measured value without calibrated instrumentation.
