package com.shubham225.jobmonitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
@EnableScheduling
@EntityScan(basePackages = "com.shubham225.jobmonitor")
@EnableJpaRepositories(basePackages = "com.shubham225.jobmonitor")
@ComponentScan("com.shubham225.jobmonitor")
public class JobMonitorServerApplication {
	public static void main(String[] args) throws IOException {
		String home = System.getenv().getOrDefault(
				"JOB_MONITOR_HOME",
				System.getProperty("user.home") + "/.job-monitor"
		);

		Files.createDirectories(Paths.get(home, "data"));

		SpringApplication.run(JobMonitorServerApplication.class, args);
	}

}
