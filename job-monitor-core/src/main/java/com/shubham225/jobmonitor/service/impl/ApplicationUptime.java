package com.shubham225.jobmonitor.service.impl;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;

@Component
public class ApplicationUptime {
    private final Instant startedAt = Instant.now();

    public Long getUptimeMs() {
        return Duration.between(startedAt, Instant.now()).toMillis();
    }
}
