# Job Monitor Client (Rust)

![Java](https://img.shields.io/badge/Rust-1.90.0-red?logo=rust&logoColor=white&style=flat)
![Maven](https://img.shields.io/badge/Build-Cargo-orange?style=flat)
![License](https://img.shields.io/github/license/shubham225/coding-test-backend?style=flat)

Modern Rust-based command-line interface for interacting with the `job-monitor-server`.  
This client is designed to be fast, portable, and easy to integrate into automation around Infor LN ERP job monitoring.

---

## Features

- Register Infor LN ERP jobs with the `job-monitor-server` for monitoring
- Trigger status checks and health probes
- Simple, composable interface suitable for scripting and schedulers
- Compiles to a single static binary

---

## Installation

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (edition 2021, via `rustup`)

### Build from Source

From the repository root:

```bash
cd job-monitor-client

# Linux/macOS
./build.sh

# Windows
build.bat
```

The compiled binary will be located at:

```text
target/release/job-monitor-client
```

You can move it onto your `PATH`, for example:

```bash
sudo cp target/release/job-monitor-client /usr/local/bin/
```

---

## Configuration

`job-monitor-cli` communicates with the **job-monitor-server** and supports the following environment variables:

| Variable                 | Description                         | Default                 |
|--------------------------|-------------------------------------|-------------------------|
| `JOB_MONITOR_SERVER_URL` | URL of the job-monitor server       | `http://localhost:8888` |
| `JOB_MONITOR_HOME`       | Home directory for job-monitor data | current working dir     |

You can export these in your shell profile or set them per-command:

```bash
JOB_MONITOR_SERVER_URL="http://server:8888" job-monitor-client status
```

---

## Usage

Show help:

```bash
job-monitor-client --help
```

Typical commands (examples, adjust to your actual arguments):

```bash
# Register a job definition from JSON or YAML
job-monitor-client monitor --job-file job.json

# Check server status/health
job-monitor-client status
```

Refer to `job-monitor-server` API documentation for the exact contract and job payload structure.

---

## Development

Run the tests and lints:

```bash
cargo test
cargo clippy --all-targets --all-features -- -D warnings
```

Format the code:

```bash
cargo fmt
```

---

## Related Projects

- `job-monitor-server` – Spring Boot backend for monitoring and alerting
- `job-monitor-web` – Next.js web UI
- `job-monitor-common` / `job-monitor-core` – shared models and core services

