# job-monitor-cli (Java)

[![Language](https://img.shields.io/badge/language-Java-007396.svg)](https://www.java.com/)
[![Build](https://img.shields.io/badge/build-Maven-blue.svg)](https://maven.apache.org/)

Legacy command-line interface for interacting with the `job-monitor-server`.  
It allows you to register jobs for monitoring, check system status, and communicate with the Job Monitor service from scripts or terminals.

> **Note**  
> This Java CLI is considered **legacy**. New development should use the Rust-based CLI in `job-monitor-cli-rs`.

---

## Features

- Lightweight CLI for Infor LN ERP job monitoring
- Register batch jobs with the `job-monitor-server`
- Query server health/status
- Simple integration in shell scripts and schedulers (cron, Windows Task Scheduler, etc.)

---

## Installation

Build the JAR using Maven from the project root:

```bash
mvn -pl job-monitor-cli -am clean package
```

The fat JAR (if configured) or CLI artifact will be available under `job-monitor-cli/target`.

You can then create a small wrapper script:

```bash
java -jar job-monitor-cli/target/job-monitor-cli.jar "$@"
```

---

## Configuration (Environment Variables)

`job-monitor-cli` talks to the **job-monitor-server** and can be configured using environment variables:

| Variable                 | Description                         | Default                 |
|--------------------------|-------------------------------------|-------------------------|
| `JOB_MONITOR_SERVER_URL` | URL of the job-monitor server       | `http://localhost:8888` |
| `JOB_MONITOR_HOME`       | Home directory for job-monitor data | `./`                    |

You can export these in your shell profile or set them in your scheduler.

---

## Usage

General usage:

```text
job-monitor-cli [-hV] [COMMAND]
A command-line interface for managing and interacting with the job-monitor service.

Options:
  -h, --help      Show help message and exit.
  -V, --version   Print version information and exit.

Commands:
  monitor   Registers a job with the job-monitor service for real-time monitoring.
  status    Checks the status of the job-monitor service.
```

### Examples

Register a job:

```bash
job-monitor-cli monitor --job-file job.json
```

Check server status:

```bash
job-monitor-cli status
```

---

## Related Projects

- `job-monitor-cli-rs` – modern Rust-based CLI replacement
- `job-monitor-server` – Spring Boot monitoring backend
- `job-monitor-web` – Next.js web UI for monitoring dashboards