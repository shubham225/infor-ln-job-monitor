package com.shubham225.jobmonitor.windows.event.impl;

import com.shubham225.jobmonitor.windows.event.EventLogClient;
import com.shubham225.jobmonitor.windows.event.domain.EventLogQuery;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Slf4j
public class EventLogClientImpl implements EventLogClient {
    @Override
    public int getEventViewerLog(EventLogQuery query) {
        try {
            exportWindowsEventLog(query.logName(), query.startTime(), query.endTime(), query.outputFilepath().toString());
        } catch (IOException e) {
            log.error("I/O Error [{}]: {}", query.outputFilepath(), e.getMessage());
            return -1;
        } catch (Exception e) {
            log.error("Runtime Error [{}]: {}", query.outputFilepath(), e.getMessage());
            return -2;
        }
        return 0;
    }

    @Override
    public int addEventViewerLog(String logName, String source, String entryType, String message) {
        try {
            writeEvent(logName, source, 1001, entryType, message);
        } catch (IOException e) {
            log.error("I/O Error [{} -> {}]: {}", logName, source, e.getMessage());
            return -1;
        } catch (InterruptedException e) {
            log.error("Runtime Error [{} -> {}]: {}", logName, source, e.getMessage());
            return -2;
        }

        return 0;
    }

    private void exportWindowsEventLog(
            String logName,
            LocalDateTime start,
            LocalDateTime end,
            String outputEvtx) throws InterruptedException, IOException {

        String startUtc = toUtcIso(start);
        String endUtc = toUtcIso(end);

        String query = "*[System[TimeCreated[@SystemTime >= '" +
                startUtc + "' and @SystemTime <= '" + endUtc + "']]]";

        String command = String.format(
                "wevtutil epl \"%s\" \"%s\" /q:\"%s\"",
                logName, outputEvtx, query
        );

        ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", command);
        pb.inheritIO();

        Process process = pb.start();
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new RuntimeException("Failed to export event logs. Exit code: " + exitCode);
        }
    }

    private void writeEvent(
            String logName,
            String source,
            int eventId,
            String entryType,
            String message) throws IOException, InterruptedException {

        String escapedMessage = message
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");

        String command = String.format(
                "Write-EventLog -LogName '%s' -Source '%s' "
                        + "-EventId %d -EntryType %s -Message \"%s\"",
                logName,
                source,
                eventId,
                entryType,
                escapedMessage);

        Process process = new ProcessBuilder(
                "powershell.exe",
                "-ExecutionPolicy", "Bypass",
                "-Command",
                command)
                .redirectErrorStream(true)
                .start();

        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new RuntimeException(
                    "Failed to write event log. Exit code: " + exitCode);
        }
    }

    private String toUtcIso(LocalDateTime ldt) {
        return ldt.atZone(ZoneOffset.systemDefault())
                .withZoneSameInstant(ZoneOffset.UTC)
                .format(DateTimeFormatter.ISO_INSTANT);
    }
}
