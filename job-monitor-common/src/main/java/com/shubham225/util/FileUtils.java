package com.shubham225.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

public final class FileUtils {
    private static final DateTimeFormatter TS_FORMAT =
            DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

    public static String evtxWithTimestamp(String name) {
        return name + "_eventLog_" + nowCompact() + ".evtx";
    }

    private static String nowCompact() {
        return LocalDateTime.now().format(TS_FORMAT);
    }

    // SIMPLE INI PARSER
    public static Map<String, Map<String, String>> parseIniFile(String filePath) throws IOException {
        Map<String, Map<String, String>> result = new HashMap<>();

        String currentSection = null;

        for (String line : Files.readAllLines(Path.of(filePath), StandardCharsets.UTF_8)) {
            line = line.trim();

            if (line.isEmpty() || line.startsWith(";") || line.startsWith("#")) {
                continue;
            }

            if (line.startsWith("[") && line.endsWith("]")) {
                currentSection = line.substring(1, line.length() - 1);
                result.put(currentSection, new HashMap<>());
                continue;
            }

            if (currentSection != null && line.contains("=")) {
                String[] parts = line.split("=", 2);
                result.get(currentSection).put(parts[0].trim(), parts[1].trim());
            }
        }

        return result;
    }

    // Extract BSE_COMPNR from command string
    public static String extractCompany(String commandLine) {
        // Look for substring like "BSE_COMPNR=550"
        String key = "BSE_COMPNR=";

        int idx = commandLine.indexOf(key);
        if (idx == -1) {
            return "UNKNOWN";
        }

        int start = idx + key.length();

        // extract until next space or end of string
        int end = commandLine.indexOf(" ", start);
        if (end == -1) {
            end = commandLine.length();
        }

        return commandLine.substring(start, end).trim();
    }
}
