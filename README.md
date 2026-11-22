# BoltSense

**Monitor. Predict. Prevent.** A responsive industrial IoT dashboard prototype featuring an interactive 3D machine digital twin, component inspection, simulated trends, a Node.js API, PostgreSQL/Prisma, Socket.IO, and a Raspberry Pi → MQTT telemetry pipeline.

> **Prototype, not a safety control system.** All demo readings are **SIMULATED**. The procedural CNC and generic machine representations are **demonstration geometry, not engineering CAD**. No real-world alarm or maintenance decision should rely on this prototype without engineering validation, verified sensors, and site safety controls.

## Included

- React + TypeScript + Vite, Tailwind CSS, shadcn-style Button with Radix Slot, Framer Motion, Lucide, Zustand.
- Three.js + React Three Fiber + Drei interactive CNC digital twin: orbit/zoom, click/hover part selection, labels, temperature/risk coloring, responsive inspection drawer, camera reset, fullscreen.
- 8 industrial machine categories; CNC has 7 individually mapped demonstration components. Other machines use clearly labeled generic procedural models rather than pretending to have precision CAD.
- Dashboard with sensor table, simulated Recharts telemetry trends, maintenance and alert views.
- Express REST API + Zod validation, PostgreSQL/Prisma model/schema, MQTT ingestion with sensor/machine/component ID verification, Socket.IO events, optional JWT authentication for protected mutations.
- Raspberry Pi Python publisher with **explicit mock mode** or configurable hardware adapter; configurable MQTT broker.
- Transparent risk rules with configurable sensor-specific thresholds; unit tests and API integration tests.
- No trained predictive AI, no fabricated physical readings, no guaranteed failure dates.

## Requirements

- Node.js 20+ and npm
- For real MQTT + database integration: Docker (or your own PostgreSQL and Mosquitto), Raspberry Pi with properly installed sensors
- Modern browser with WebGL support

## Quick start — visual demo (no hardware, MQTT or database required)

```bash
npm install
cp .env.example server/.env
npm run db:generate
npm run dev
```

Open **http://localhost:5173**. The client starts in **Demo** mode and uses a self-contained labeled simulation dataset. The API is available at **http://localhost:4000/api/health**. Use the Demo/Live switch in the bottom right.

Windows PowerShell can use `Copy-Item .env.example server/.env` instead of `cp`.

### Production build

```bash
npm run db:generate
npm run build
npm test
```

Run the frontend with `npm run preview -w client` and the backend with `npm start -w server` after building. Serve the frontend and API through a TLS reverse proxy in production.

## Enable a real PostgreSQL/MQTT pipeline

```bash
docker compose up -d
cp .env.example server/.env
```

Edit `server/.env` to set `DATA_MODE=live`, ensure the Postgres credentials and broker URL are correct, and configure production-safe broker authentication/TLS **before any nonlocal deployment**. The included Mosquitto configuration permits anonymous local development only.

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Switch to **Live** in the browser. Live mode does **not** silently use demo sensor values if the backend, sensor or MQTT connection is unavailable. Its API requires PostgreSQL, and it rejects MQTT telemetry from sensors not registered to the matching machine/component.

> The Prisma seed script registers the example machine hierarchy and CNC sensors but deliberately does not seed fake live telemetry. For physical deployment, verify wiring, sensor IDs, calibration metadata and per-machine thresholds against the actual installation.

## Raspberry Pi publisher

```bash
cd raspberry-pi
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python publisher.py --simulate \
  --broker mqtt://YOUR_BROKER_IP:1883 \
  --machine-id cnc-001 \
  --component-id spindle-bearing-01 \
  --sensor-id vibration-01
```

This command produces **MOCK readings** from the `MockBearingAdapter`. The console explicitly displays `SIMULATED` and does not access hardware. To connect a real sensor, implement and calibrate a hardware adapter as shown in `raspberry-pi/custom_adapter_example.py`, then pass `--adapter your_module:YourAdapter`. Ensure its `read()` method returns only documented units and that the sensor ID is registered in PostgreSQL.

Payload schema:

```json
{
  "schemaVersion": 1,
  "machineId": "cnc-001",
  "componentId": "spindle-bearing-01",
  "sensorId": "vibration-01",
  "timestamp": "2026-11-22T05:00:00Z",
  "metrics": { "temperatureC": 56.4, "vibrationRmsMmS": 2.1 }
}
```

MQTT topic: `boltsense/{machineId}/{componentId}/telemetry`. Optional status topic reserved for future development: `boltsense/{machineId}/{componentId}/status`.

## API routes

| Method | Route | Access |
| --- | --- | --- |
| GET | `/api/health` | Public |
| GET | `/api/machines` | Public |
| GET | `/api/machines/:id` | Public |
| GET | `/api/machines/:id/components` | Public |
| GET | `/api/components/:id` | Public |
| GET | `/api/components/:id/history?limit=100` | Public |
| GET | `/api/components/:id/risk` | Public |
| GET | `/api/sensors` | Public |
| GET | `/api/alerts` | Public |
| GET | `/api/maintenance` | Public |
| POST | `/api/auth/login` | Configured administrator |
| POST | `/api/alerts/:id/acknowledge` | JWT admin/technician |
| POST | `/api/maintenance` | JWT admin/technician |

For privileged writes, configure `server/.env` with `ADMIN_EMAIL`, a bcrypt `ADMIN_PASSWORD_HASH`, and a random `JWT_SECRET` of at least 32 characters. Login returns a 4-hour bearer token. Without those values, authentication is deliberately disabled. Production systems also need per-user accounts, audit trails, TLS, rate limits by identity, and finer-grained authorizations.

## Risk and maintenance limitations

- Risk analysis is `rules-v0.1`, not AI. A sensor must have calibrated `thresholds` JSON such as `{"vibrationRmsMmS":{"warning":3.5,"critical":7}}`. **These numbers are sample syntax only**, not safe machine limits.
- No configured limit → `unknown` / `null` score. Missing measurements remain missing.
- Duplicate sensor/time readings are ignored; MQTT topic, machine ID, component ID and sensor registry are cross-checked.
- Alerts use an open-alert lookup and a 10%-of-threshold-span hysteresis clearance to avoid repeat notifications. Production deployments may require additional debounce and site-specific rules.
- Actual failure probability, remaining useful life, and confidence are unavailable until a validated trained model is supplied. See `raspberry-pi/prediction_service_stub.py`.

## Files

```text
client/               React UI, Three.js digital twin, charts, routing
server/src/           Express routes, auth, MQTT ingest, validation, risk logic
server/prisma/        PostgreSQL schema and seed registry
raspberry-pi/         Configurable publisher, mock and hardware adapter contract
mosquitto/            Local-development-only broker config
docs/                 Architecture and hardware guidance
.github/workflows/    Continuous integration
```

## Publishing to a new GitHub repository

1. Create an **empty** repository called `BoltSense` on GitHub (choose visibility). Leave the README/.gitignore/license options **unchecked** because this project already contains them.
2. From the extracted project directory:

```bash
git init -b main
git add .
git commit -m "Initial BoltSense industrial IoT MVP"
git remote add origin https://github.com/YOUR_USERNAME/BoltSense.git
git push -u origin main
```

The archive is also initialized as a local Git repository with a first commit, so you can skip `git init`, `git add`, and `git commit` if you preserve its `.git` directory when extracting a complete folder archive. GitHub will ask you to authenticate for pushing if you have not connected git locally.

## Known MVP boundaries

- The CNC machine is interactive but procedural, with no included third-party GLB or licensed CAD. The generic machines are deliberately simplified.
- The browser's Demo mode operates independently of the backend. Demo acknowledgement is local state only.
- Component focus uses hover and selectable meshes; automated camera close-ups and exploded view are future enhancements.
- Current live trend charts, live database-backed UI lists, technician assignment UI, model-specific configuration editor, and report PDF export are not fully implemented. JSON demo export is available from the inspection panel.
- Although the API supports live storage/telemetry, deploying physical sensors requires genuine sensor drivers, calibration, thresholds, and industrial networking precautions.

License: no open-source license has been selected. Add one before inviting outside contributions or redistribution.
