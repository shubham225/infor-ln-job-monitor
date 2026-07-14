package com.shubham225.jobmonitor.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootVersion;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.LinkedHashMap;
import java.util.Map;

public class BannerPropertiesCustomizer implements EnvironmentPostProcessor {

    // matches the value-field width designed into banner.txt.
    // Label column is a fixed 14 chars ("Spring Boot : "), box content area is
    // 49 chars total, so the value field gets the remaining 35 chars.
    private static final int VALUE_WIDTH = 35;
    private static final int NAME_FIELD_WIDTH = VALUE_WIDTH;

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Map<String, Object> props = new LinkedHashMap<>();

        // Banner Application name
        String name = environment.getProperty("info.application.name", "JobMonitor");
        String version = " [" + environment.getProperty("info.application.version", "unknown") + "]";
        int usedWidth = name.length() + version.length();
        int padSize = NAME_FIELD_WIDTH - usedWidth;
        String nameRaw;
        String namePad;

        if (padSize >= 0) {
            nameRaw = name;
            namePad = " ".repeat(padSize);
        } else {
            // name + suffix too long for the field — truncate name so it still fits
            int allowed = name.length() + padSize; // -1 for the ellipsis char
            nameRaw = allowed > 0 ? name.substring(0, allowed) + "…" : name.substring(0, Math.max(name.length() + padSize, 0));
            namePad = "";
        }

        props.put("banner.name", nameRaw);
        props.put("banner.name.pad", namePad);

        // Spring Boot's own version isn't a normal Environment property,
        // so we pull it directly from the framework class instead.
        props.put("banner.springboot.padded",
                pad(SpringBootVersion.getVersion(), VALUE_WIDTH));

        // Java version isn't an Environment property either — read it from the JVM.
        props.put("banner.java.padded",
                pad(System.getProperty("java.version", "unknown"), VALUE_WIDTH));

        // PID of the running application process.
        props.put("banner.pid.padded",
                pad(String.valueOf(ProcessHandle.current().pid()), VALUE_WIDTH));

        props.put("banner.port.padded",
                pad(environment.getProperty("server.port", "8080"), VALUE_WIDTH));

        String profile = String.join(",", environment.getActiveProfiles());
        if (profile.isEmpty()) {
            profile = "default";
        }
        props.put("banner.profile.padded", pad(profile, VALUE_WIDTH));

        environment.getPropertySources().addFirst(new MapPropertySource("bannerProps", props));
    }

    private String pad(String value, int width) {
        if (value == null) value = "";
        if (value.length() >= width) {
            // truncate + mark if it overflows, so misalignment is obvious rather than silent
            return value.substring(0, width - 1) + "…";
        }
        return value + " ".repeat(width - value.length());
    }
}