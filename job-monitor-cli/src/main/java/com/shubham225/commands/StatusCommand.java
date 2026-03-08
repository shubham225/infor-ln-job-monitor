package com.shubham225.commands;

import com.shubham225.config.JobMonitorConfig;
import com.shubham225.domains.HttpResult;
import com.shubham225.utils.HttpUtil;
import picocli.CommandLine;

import java.util.concurrent.Callable;

@CommandLine.Command(
        name = "status",
        description = "checks the status of job-monitor service."
)
public class StatusCommand implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        String serverUrl = JobMonitorConfig.getServerUrl() + JobMonitorConfig.getStatusApiPath();

        // Send GET request
        HttpResult result = HttpUtil.get(serverUrl);

        if (!result.isSuccess()) {
            System.err.println("ERROR: " + result.error());
            return result.code();
        }

        System.out.println("Response Code: " + result.code());
        System.out.println("Status: " + result.body());
        return 0;
    }
}
