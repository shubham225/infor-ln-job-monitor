# Job Monitor Server ![Backend](https://img.shields.io/badge/{_}-Backend-16A34A?style=flat-square)

![Java](https://img.shields.io/badge/Java-17+-red?logo=java&logoColor=white&style=flat)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7+-green?logo=springboot&logoColor=white&style=flat)
![H2 Database](https://img.shields.io/badge/Database-H2-blue?logo=h2database&style=flat)
![Maven](https://img.shields.io/badge/Build-Maven-orange?logo=apachemaven&style=flat)
![License](https://img.shields.io/github/license/shubham225/coding-test-backend?style=flat)

`job-monitor-server` is a Spring Boot–based backend service that monitors Infor LN ERP jobs, persists execution history, and sends alerts when jobs fail or breach defined SLAs.

It exposes REST APIs that are consumed by:

- `job-monitor-cli` (Java CLI – legacy)
- `job-monitor-cli-rs` (Rust CLI – recommended)
- `job-monitor-web` (Next.js UI)

---

## Features

- REST APIs for registering jobs and reporting execution results
- Persistent storage of job definitions and history (via `job-monitor-core`)
- Alerting via email (and extensible to other channels)
- Configuration via environment variables and properties
- Lightweight deployment (single JAR)

---

## Prerequisites

- **Java 17+**
- **Maven** (for building locally)
- SMTP account for sending email alerts
- A database supported by your Spring Boot configuration (e.g., PostgreSQL, MySQL, etc.)

---

## Configuration (Environment Variables)

The application can be configured using the following environment variables (in addition to standard Spring Boot properties):

| Variable            | Description                                  | Example                |
|---------------------|----------------------------------------------|------------------------|
| `JOB_MONITOR_HOME`  | Directory for logs, data, or state files     | `/opt/job-monitor`     |
| `MAIL_USER`         | Email address used for sending notifications | `alerts@example.com`   |
| `MAIL_PASSWORD`     | SMTP password or app-specific token          | `super-secret-pass`    |
| `JOB_MONITOR_PORT`  | Port for running the application             | `8080`                 |

You can also use a standard `application.yml`/`application.properties` file to configure database, SMTP host, and other Spring Boot settings.

---

## Building

From the repository root:

```bash
mvn -pl job-monitor-server -am clean package
```

This produces a runnable JAR in `job-monitor-server/target`.

---

## Running the Application

### Using Maven

```bash
mvn -pl job-monitor-server spring-boot:run
```

### Running Using the JAR

```bash
java -jar job-monitor-server/target/job-monitor-server.jar
```

By default the server starts on `http://localhost:8080` (or the port configured via `JOB_MONITOR_PORT` / `server.port`).

---

## High-Level API Overview

> The exact endpoints may differ; consult the source for authoritative details.

Typical API surface:

- `POST /api/jobs` – register/update a job definition
- `POST /api/jobs/{id}/executions` – report a job execution result (success/failure, timings, messages)
- `GET /api/jobs` – list monitored jobs
- `GET /api/jobs/{id}/history` – view execution history
- `GET /actuator/health` – health endpoint for readiness/liveness probes

These endpoints are consumed by the CLIs and by `job-monitor-web`.

---

## Related Modules

- `job-monitor-core` – core domain and business logic used by the server
- `job-monitor-common` – shared utilities and DTOs
- `job-monitor-cli` / `job-monitor-cli-rs` – CLIs that call into this server
- `job-monitor-web` – UI for monitoring dashboards and configuration
