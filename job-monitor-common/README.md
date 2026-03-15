# job-monitor-common

[![Language](https://img.shields.io/badge/language-Java-007396.svg)](https://www.java.com/)
[![Packaging](https://img.shields.io/badge/packaging-JAR-lightgrey.svg)](#)

Shared Java utilities, models, and helper abstractions used across the Job Monitor ecosystem (`job-monitor-core`, `job-monitor-server`, CLIs, and the web layer).

---

## Responsibilities

`job-monitor-common` typically contains:

- Shared DTOs and value objects used by multiple modules
- Common error/exception types
- E-mail / notification helpers
- JSON and date/time serialization configuration (Jackson, JSR-310, etc.)
- Reusable logging and servlet-related utilities

This module is intentionally free of Spring Boot and persistence specifics so it can be reused broadly.

---

## Usage

`job-monitor-common` is a Maven module in the multi-module `job-monitor` project.

### Maven

In another module within the same project, you can depend on it via:

```xml
<dependency>
    <groupId>com.shubham225</groupId>
    <artifactId>job-monitor-common</artifactId>
    <version>1.0.0</version>
</dependency>
```

If you publish it to an internal repository, the same coordinates can be used by external projects.

---

## Building

From the repository root:

```bash
mvn -pl job-monitor-common -am clean package
```

This builds `job-monitor-common` and any required dependencies.

---

## Related Modules

- `job-monitor-core` – core business logic and domain services built on top of `job-monitor-common`
- `job-monitor-server` – Spring Boot backend consuming `job-monitor-core` and `job-monitor-common`
- `job-monitor-cli` / `job-monitor-cli-rs` – CLIs talking to `job-monitor-server`

