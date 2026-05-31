package com.shubham225.windows.scheduler.impl;

import com.shubham225.model.enums.TaskSchedulerStatus;
import com.shubham225.windows.scheduler.TaskSchedulerClient;
import com.shubham225.windows.scheduler.domain.ScheduledTask;
import com.shubham225.windows.scheduler.domain.TaskQuery;
import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
public class TaskSchedulerClientImpl implements TaskSchedulerClient {
    private static final DateTimeFormatter[] DATE_FORMATS = {
            DateTimeFormatter.ofPattern("M/d/yyyy h:mm:ss a", Locale.ENGLISH),
            DateTimeFormatter.ofPattern("d-M-yyyy h:mm:ss a", Locale.ENGLISH),
            DateTimeFormatter.ofPattern("dd-MM-yyyy h:mm:ss a", Locale.ENGLISH)
    };

    @Override
    public ScheduledTask findWinSchedTask(TaskQuery taskQuery) {
        log.info("fetching task '{}' details from win scheduler folder '{}'", taskQuery.taskName(), taskQuery.folder());
        return getTask(taskQuery.taskName(), taskQuery.folder());
    }

    @Override
    public List<ScheduledTask> findAllWinSchedTask(TaskQuery taskQuery) {
        return getTasksFromFolder(taskQuery.folder());
    }

    @Override
    public ScheduledTask fetchWinSchedTaskDetails(String hostName, String taskName, String folder) {
        log.info("fetching details of task '{}' from windows scheduler folder '{}'", taskName, folder);
        return getTask(taskName, folder);
    }

    private List<ScheduledTask> getTasksFromFolder(String folder) {
        log.info("finding all tasks from win scheduler folder '{}'", folder);

        List<String> taskNames = listTaskNames(folder);

        List<ScheduledTask> tasks = new ArrayList<>();
        for (String taskName : taskNames) {
            tasks.add(getTask(taskName, folder));
        }

        return tasks;
    }

    private List<String> listTaskNames(String folder) {
        log.error("listing all tasks from win scheduler folder '{}'", folder);

        String normalized = normalizeFolder(folder);
        String command = "schtasks /query /fo CSV";

        List<String> result = new ArrayList<>();

        try {
            ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", command);
            pb.redirectErrorStream(true);

            Process process = pb.start();

            try (BufferedReader reader =
                         new BufferedReader(new InputStreamReader(process.getInputStream()))) {

                String line;
                boolean headerSkipped = false;

                while ((line = reader.readLine()) != null) {

                    if (!headerSkipped) {
                        headerSkipped = true;
                        continue;
                    }

                    String[] cols = parseCsv(line);
                    String taskPath = cols[0]; // "TaskName"

                    if (taskPath.startsWith(normalized)) {
                        String nameOnly = taskPath.substring(taskPath.lastIndexOf("\\") + 1);
                        result.add(nameOnly);
                    }
                }
            }

            process.waitFor();
        } catch (Exception e) {
            log.error("Failed to list all tasks from win scheduler folder '{}'", folder);
//            throw new RuntimeException("Failed to list tasks", e);
        }

        return result;
    }

    private String normalizeFolder(String folder) {
        if (folder == null || folder.isBlank() || folder.equals("\\")) {
            return "\\";
        }
        folder = folder.replace("/", "\\");
        if (!folder.startsWith("\\")) folder = "\\" + folder;
        if (!folder.endsWith("\\")) folder += "\\";
        return folder;
    }

    private String[] parseCsv(String line) {
        // minimal CSV parser for schtasks output
        return line.replace("\"", "").split(",", -1);
    }

    private ScheduledTask getTask(String taskName, String folder) {
        String fullPath = folder.endsWith("\\")
                ? folder + taskName
                : folder + "\\" + taskName;

        String command = "schtasks /query /tn \"" + fullPath + "\" /v /fo LIST";

        ScheduledTask task = new ScheduledTask();
        task.setTaskName(taskName);
        task.setHostName("localhost");

        try {
            ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", command);
            pb.redirectErrorStream(true);

            Process process = pb.start();

            try (BufferedReader reader =
                         new BufferedReader(new InputStreamReader(process.getInputStream()))) {

                String line;
                while ((line = reader.readLine()) != null) {
                    parseLine(line, task);
                }
            }

            process.waitFor();
        } catch (Exception e) {
            log.error("Failed to query scheduled task '{}' from win scheduler folder '{}'", taskName, folder);
            throw new RuntimeException("Failed to query scheduled task", e);
        }

        return task;
    }

    private void parseLine(String line, ScheduledTask task) {
        int idx = line.indexOf(':');
        if (idx < 0) return;

        String key = line.substring(0, idx).trim();
        String value = line.substring(idx + 1).trim();

        switch (key) {
            case "HostName":
                task.setHostName(value);
                break;

            case "Status":
                task.setStatus(parseStatus(value));
                break;

            case "Last Run Time":
                task.setLastRuntime(parseDate(value));
                break;

            case "Next Run Time":
                task.setNextRuntime(parseDate(value));
                break;

            case "Task To Run":
                // TODO: when multiple actions it may have string "Multiple actions", handle in future
                task.setAction(value);
        }
    }

    private TaskSchedulerStatus parseStatus(String value) {
        return switch (value.toUpperCase()) {
            case "READY" -> TaskSchedulerStatus.READY;
            case "RUNNING" -> TaskSchedulerStatus.RUNNING;
            case "DISABLED" -> TaskSchedulerStatus.DISABLED;
            default -> TaskSchedulerStatus.UNKNOWN;
        };
    }

    private LocalDateTime parseDate(String value) {
        if (value == null || value.equalsIgnoreCase("N/A")) {
            return null;
        }

        for (DateTimeFormatter f : DATE_FORMATS) {
            try {
                return LocalDateTime.parse(value, f);
            } catch (Exception ignored) {
            }
        }

        throw new IllegalArgumentException("Unparseable date: " + value);
    }

    private Integer parseInt(String value) {
        try {
            return Integer.valueOf(value);
        } catch (Exception e) {
            return null;
        }
    }
}
