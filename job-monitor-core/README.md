# Job Monitor Core

[![Language](https://img.shields.io/badge/language-Java-007396.svg)](https://www.java.com/)
[![Framework](https://img.shields.io/badge/spring-data-green.svg)](https://spring.io/projects/spring-data)

Core business logic and domain services for the Job Monitor application.  
This module encapsulates the central concepts around monitored jobs, executions, alert rules, and integrations with Infor LN ERP–style job scheduling.

---

## Responsibilities

`job-monitor-core` typically includes:

- Domain models for jobs, executions, schedules, and alerts
- Business rules for detecting failures and delays
- Mapping logic (MapStruct) between entities and DTOs
- Validation and cross-field consistency checks
- Core services that are consumed by `job-monitor-server`

It is intentionally focused on domain logic; transport and presentation concerns live in `job-monitor-server` and `job-monitor-web`.

---

## Dependencies

Key dependencies (see `pom.xml` for full list):

- `job-monitor-common` – shared DTOs and utilities
- Spring Data (Commons & JPA)
- Hibernate ORM
- MapStruct for mapping
- Bean validation and Thymeleaf support for server-side rendering use cases

---

## Usage

Within the multi-module Maven project, other modules (notably `job-monitor-server`) depend on `job-monitor-core`:

```xml
<dependency>
    <groupId>com.shubham225</groupId>
    <artifactId>job-monitor-core</artifactId>
    <version>1.0.0</version>
</dependency>
```

`job-monitor-core` is not meant to be run directly; instead, it is wired into a Spring Boot application (see `job-monitor-server`).

---

## Building

From the repository root:

```bash
mvn -pl job-monitor-core -am clean package
```

This compiles the module, runs tests (if any), and produces a JAR under `job-monitor-core/target`.

---

## Related Modules

- `job-monitor-common` – shared abstractions used by this module
- `job-monitor-server` – Spring Boot backend built on top of `job-monitor-core`
- `job-monitor-web` – Next.js UI consuming server APIs

