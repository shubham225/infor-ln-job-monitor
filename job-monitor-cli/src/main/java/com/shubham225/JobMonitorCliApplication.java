package com.shubham225;

import com.shubham225.commands.MonitorCommand;
import com.shubham225.commands.StatusCommand;
import com.shubham225.config.VersionProvider;
import picocli.CommandLine;

@CommandLine.Command(
        name = "job-monitor-cli",
        mixinStandardHelpOptions = true,
        versionProvider = VersionProvider.class,
        description = "A command-line interface for managing and interacting with the job-monitor service.",
        subcommands = {
                MonitorCommand.class,
                StatusCommand.class
        }
)
public class JobMonitorCliApplication implements Runnable {

    public static void main(String[] args) throws Exception {
        int exitCode = new CommandLine(new JobMonitorCliApplication()).execute(args);
        System.exit(exitCode);
    }

    @Override
    public void run() {
        System.out.println("Use a subcommand: monitor");
    }
}