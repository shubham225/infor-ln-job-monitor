package com.shubham225.commands;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.shubham225.config.JobMonitorConfig;
import com.shubham225.domains.HttpResult;
import com.shubham225.util.FileUtils;
import com.shubham225.utils.HttpUtil;
import picocli.CommandLine;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.Callable;

@CommandLine.Command(
        name = "monitor",
        description = "Registers a job with the job-monitor service for real-time monitoring."
)
public class MonitorCommand implements Callable<Integer> {
    @CommandLine.Option(names = {"-j", "--job"}, description = "Job name")
    String jobName;

    @CommandLine.Option(names = {"-b", "--bwc"}, description = "BWC file path")
    String bwcFilePath;

    static int startMonitoring(String jobName, String bwcFile) {
        // Environment variable for URL
        String serverUrl = JobMonitorConfig.getServerUrl() + JobMonitorConfig.getMonitorApiPath();

        Map<String, Map<String, String>> data;

        try {
            // Parse INI file
            data = FileUtils.parseIniFile(bwcFile);
        } catch (IOException e) {
            System.err.println("ERROR: I/O error while reading BWC file.");
            System.err.println("Reason: " + e.getMessage());
            return 1;
        }

        // Extract fields
        String bse = data.get("ApplicationServer").get("bse");
        String command = data.get("ApplicationServer").get("command");

        String hostname = data.get("Remote").get("hostname");
        String username = data.get("Remote").get("username");

        // Extract BSE_COMPNR from command
        String bseCompany = FileUtils.extractCompany(command);

        // Build JSON
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode json = mapper.createObjectNode();

        json.put("jobName", jobName);
        json.put("commandLine", command);
        json.put("bseCompany", bseCompany);
        json.put("user", username);
        json.put("bwHostName", hostname);
        json.put("bse", bse);

        // Send POST request
        HttpResult result = HttpUtil.post(serverUrl, json);

        if (!result.isSuccess()) {
            System.err.println("ERROR: " + result.error());
            return result.code();
        }

        System.out.println("Response Code: " + result.code());
        System.out.println("Status: " + result.body());

        return 0;
    }

    @Override
    public Integer call() throws Exception {
        return startMonitoring(jobName, bwcFilePath);
    }
}
