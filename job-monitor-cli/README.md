# JobMonitor-CLI
job-monitor-cli is a lightweight command-line interface for interacting with the job-monitor-server.
It allows you to register jobs for monitoring, check system status, and communicate with the job-monitor service using a simple and fast CLI tool.

## ⚙️ Environment Variables
job-monitor-cli is a command-line tool for interacting with the **job-monitor-server**.  
It supports optional environment variables:

| Variable             | Description                    | Default               |
|----------------------|--------------------------------|------------------------|
| JOB_MONITOR_SERVER_URL  | URL of the job-monitor server     | http://localhost:8888 |
| JOB_MONITOR_HOME        | Home directory for job-monitor    | ./                    |

## 🚀 Usage
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
## Examples
```shell
job-monitor-cli monitor --job-file job.json  
```
```shell
job-monitor-cli status
```