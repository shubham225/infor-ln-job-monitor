package com.shubham225;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EntityScan(basePackages = "com.shubham225")
@EnableJpaRepositories(basePackages = "com.shubham225")
@ComponentScan("com.shubham225")
public class JobMonitorServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(JobMonitorServerApplication.class, args);
	}

}
