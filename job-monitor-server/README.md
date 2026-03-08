# JobMonitor-Server

**job-monitor-server** is a Spring Boot–based monitoring backend service designed to collect, process, and distribute system or application monitoring data. It provides REST APIs and optional email notifications for alerts.

---

## Features

- REST API for receiving and querying monitoring events
- Email notifications for important alerts
- Lightweight and easy deployment
- Fully configurable using environment variables

---

## Prerequisites

- **Java 17+**
- **Maven** (if building locally)
- SMTP account for sending email alerts

---

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Example |
|---------|-------------|---------|
| `JOB_MONITOR_HOME` | Directory for logs, data, or state files | `/opt/job-monitor` |
| `MAIL_USER` | Email address used for sending notifications | `alerts@example.com` |
| `MAIL_PASSWORD` | SMTP password or app-specific token | `super-secret-pass` |
| `JOB_MONITOR_PORT` | Port for running the application | `8080` |

## Running the Application

### Using Maven

```bash
mvn spring-boot:run
```

### Running Using the JAR

```bash
java -jar job-monitor-server.jar
```