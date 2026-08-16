# ![logo](./docs/readme/job-monitor-logo.png)

![Java](https://img.shields.io/badge/Java-17+-red?logo=java&logoColor=white&style=flat)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7+-green?logo=springboot&logoColor=white&style=flat)
![H2 Database](https://img.shields.io/badge/Database-H2-blue?logo=h2database&style=flat)
![Maven](https://img.shields.io/badge/Build-Maven-orange?logo=apachemaven&style=flat)
![Next.js](https://img.shields.io/badge/Framework-Next.js-000?logo=nextdotjs&logoColor=white&style=flat)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white&style=flat)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn/ui-9f7aea?logo=shadcnui&style=flat)
![Yarn](https://img.shields.io/badge/Package_Manager-Yarn-2C8EBB?logo=yarn&style=flat)
![Release](https://img.shields.io/github/v/release/shubham225/infor-ln-job-monitor?style=flat)
![License](https://img.shields.io/github/license/shubham225/infor-ln-job-monitor?style=flat)

**Job Monitor** is a multi-module system for monitoring **Infor LN ERP** jobs and sending alerts when executions fail or breach SLAs. It consists of a Spring Boot backend, a modern Next.js web UI, and a lightweight client for integrating with existing schedulers.

---

## Table of Contents

- [Modules](#modules)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
- [ERP Integration Contract](#erp-integration-contract)
- [License](#license)

---

## Modules

| Module               | Description                                                |
|-----------------------|------------------------------------------------------------|
| `job-monitor-client` | Rust-based client for registering jobs to server           |
| `job-monitor-server` | Spring Boot backend that stores job data and triggers alerts |
| `job-monitor-core`   | Core domain models and business logic                      |
| `job-monitor-common` | Shared utilities used across backend modules               |
| `job-monitor-web`    | Next.js web UI for visualization and administration        |

Each module includes its own `README.md` with setup and usage details specific to that module.

---

## Architecture

- **Client** (`job-monitor-client`)
  Registers jobs with the server and reports execution results (success/failure).

- **Backend** (`job-monitor-server`, `job-monitor-core`, `job-monitor-common`)
  Stores job definitions and execution history, evaluates alert rules, dispatches notifications (e.g., email), and serves the web UI.

- **Web UI** (`job-monitor-web`)
  Provides dashboards for job status and history, along with configuration and administration views. Built as a static Next.js export and packaged into its own JAR.

![architecture](./docs/readme/architecture.gif)

---

## Getting Started

### Option 1: Download a Release (Recommended)

The simplest way to get started is to download the latest packaged release, which includes the server (with the web UI bundled in) and the client.

1. Go to the [Releases](https://github.com/shubham225/infor-ln-job-monitor/releases) page and download the latest release (e.g. `v1.0.0`).
2. Run the server jar:

   ```bash
   java -jar job-monitor-server.jar
   ```

3. Open your browser to `http://localhost:<JOB_MONITOR_PORT>` (default `8080`) to access the web UI, no separate frontend build or server needed.
4. Set up the client on your scheduler host to register jobs and report execution results (see [`job-monitor-client`](./job-monitor-client) for details).

### Option 2: Build From Source

#### Prerequisites

- Java 17+
- Maven
- Node.js (LTS) and Yarn, required to build `job-monitor-web`.
- Rust toolchain (`rustup`), for building `job-monitor-client`
- SMTP credentials, for email alerts

> Node.js/Yarn and the Rust toolchain only need to be available on your `PATH`. Maven takes care of installing a local pinned Node/Yarn version for the web build and invoking `cargo` through the client module's build scripts, no separate manual build/copy steps required.

#### Steps

1. **Build everything from the root**

   ```bash
   mvn clean install
   ```

   This single command:
    - Builds `job-monitor-web` — runs `yarn install` and `yarn build` (static export), then packages the output into `job-monitor-web-<version>.jar` under `META-INF/resources`.
    - Builds `job-monitor-client` — runs `build.sh`/`build.cmd` for the Rust client, depending on your OS.
    - Builds `job-monitor-core`, `job-monitor-common`, and `job-monitor-server`, with `job-monitor-server` pulling in `job-monitor-web` as a normal Maven dependency.

2. **Run the server**

   ```bash
   cd job-monitor-server
   mvn spring-boot:run
   ```

   The web UI is served by the same process at `http://localhost:<JOB_MONITOR_PORT>`.

   > For active frontend development with hot reload, you can still run the UI standalone instead of rebuilding the whole project on every change:
   > ```bash
   > cd job-monitor-web
   > yarn dev
   > ```
   > Point it at the running server via `JOB_MONITOR_SERVER_URL`. Once you're done, running `mvn clean install` from the root will re-package your changes into the `job-monitor-web` JAR for the server to pick up.

3. **Run the client**

   After `mvn clean install` from the root, the built client binary is available under `job-monitor-client/target/release/`. Alternatively, you can build the client module on its own:

   ```bash
   cd job-monitor-client

   # Linux/macOS
   ./build.sh

   # Windows
   build.cmd
   ```

---

## Configuration

Common environment variables used across modules:

| Variable                 | Used In        | Description                         |
|---------------------------|-----------------|--------------------------------------|
| `JOB_MONITOR_SERVER_URL` | Client, Web UI | Base URL of `job-monitor-server`    |
| `JOB_MONITOR_HOME`       | Server, Client | Directory for logs and data         |
| `JOB_MONITOR_PORT`       | Server         | HTTP port for the backend (and bundled web UI) |
| `MAIL_USER`              | Server         | Sender address for email alerts     |
| `MAIL_PASSWORD`          | Server         | SMTP password or app-specific token |

See the individual module READMEs for the full configuration reference.

---

## Screenshots

### Homepage
![homepage](./docs/readme/homepage.png)

### Job Execution History
![execution-history](./docs/readme/execution-history.png)

### Server Mapping
![server-mapping](./docs/readme/server-mapping.png)

### Settings
![settings](./docs/readme/settings.png)

### Alert Email Template
![alert-template](./docs/readme/alert-email-template.png)

---

## ERP Integration Contract

The ERP Monitor application expects requests and responses in the formats below. A middleware layer can be used to translate these into ERP-specific API calls, as long as it preserves this contract.

### 1. Fetch Job Details

**Request**

```json
{
  "jobCode": "JOB001",
  "company": "COMP01"
}
```

**Response**

```json
{
  "jobCode": "JOB001",
  "company": "COMP01",
  "hostDisplayName": "ERP-SERVER-01",
  "description": "Daily Invoice Processing",
  "status": "RUNNING",
  "historyStatus": "SUCCESS",
  "userId": "SYSTEM",
  "jobStartedAt": "2026-07-02T10:15:00",
  "jobEndedAt": "2026-07-02T10:18:30",
  "nextJobExecutionAt": "2026-07-03T10:15:00",
  "jobAverageRuntimeInSec": 210,
  "jobNotFound": false
}
```

### 2. Fetch Job History Error Messages

**Request**

```json
{
  "jobCode": "JOB001",
  "company": "COMP01"
}
```

**Response**

```json
{
  "jobCode": "JOB001",
  "company": "COMP01",
  "messages": [
    "Unable to connect to database.",
    "Retry completed successfully."
  ]
}
```

> **Note:** The middleware may expose any ERP-specific endpoints internally, but must accept and return data in the formats shown above so the ERP Monitor application can integrate without modification.

---

## License

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.