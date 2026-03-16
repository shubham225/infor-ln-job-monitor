# Job Monitor

[![Language](https://img.shields.io/badge/Java-17+-007396.svg)](https://www.java.com/)
[![Backend](https://img.shields.io/badge/Spring%20Boot-backend-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Frontend](https://img.shields.io/badge/Next.js-frontend-black.svg)](https://nextjs.org/)
[![CLI](https://img.shields.io/badge/CLI-Rust-orange.svg)](https://www.rust-lang.org/)

Job Monitor is a multi-module system for monitoring **Infor LN ERP** jobs and sending alerts when executions fail or breach SLAs.  
It consists of a Spring Boot backend, a modern Next.js web UI, and CLI tools for easy integration with existing schedulers.

---

## Modules

- `job-monitor-cli` – legacy Java-based CLI for interacting with the server
- `job-monitor-cli-rs` – modern Rust-based CLI (recommended)
- `job-monitor-common` – shared Java models and utilities
- `job-monitor-core` – core domain and business logic
- `job-monitor-server` – Spring Boot backend for monitoring and alerts
- `job-monitor-web` – Next.js web UI

Each module has its own `README.md` with more detailed information.

---

## High-Level Architecture

- **CLIs (`job-monitor-cli`, `job-monitor-cli-rs`)**  
  Register jobs and push execution results (success/failure) to the backend.

- **Backend (`job-monitor-server`, `job-monitor-core`, `job-monitor-common`)**  
  Stores job definitions and history, evaluates alert rules, and sends notifications (e.g., email).

- **Web UI (`job-monitor-web`)**  
  Visualizes job status and history, and provides configuration and administration views.

---

## Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js (LTS) for the web UI
- Rust toolchain (`rustup`) for the Rust CLI (optional but recommended)
- SMTP credentials for email alerts

### Typical Local Setup

1. **Build backend modules**

   ```bash
   mvn clean package
   ```

2. **Run the server**

   ```bash
   cd job-monitor-server
   mvn spring-boot:run
   ```

3. **Run the web UI**

   ```bash
   cd ../job-monitor-web
   npm install
   npm run dev
   ```

4. **Build and use the Rust CLI (optional)**

   ```bash
   cd ../job-monitor-cli-rs
   cargo build --release
   ./target/release/job-monitor-cli --help
   ```

---

## Configuration Overview

Common environment variables used across modules:

| Variable                 | Used In                | Description                                  |
|--------------------------|------------------------|----------------------------------------------|
| `JOB_MONITOR_SERVER_URL` | CLIs, web UI           | Base URL of `job-monitor-server`             |
| `JOB_MONITOR_HOME`       | Server, CLIs           | Directory for logs/data                      |
| `JOB_MONITOR_PORT`       | Server                 | HTTP port for the backend                    |
| `MAIL_USER`              | Server                 | Email sender for alerts                      |
| `MAIL_PASSWORD`          | Server                 | SMTP password or app-specific token          |
| `NEXT_PUBLIC_JOB_MONITOR_SERVER_URL` | Web UI   | Public server URL exposed to the browser     |

Check the individual module README's and configuration files for full details.

---
## Screenshot
### Homepage
![homepage](./docs/readme/homepage.png)

### Settings
![settings](./docs/readme/settings.png)

### Alert Email Template
![alert-template](./docs/readme/alert-email-template.png)

---
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


