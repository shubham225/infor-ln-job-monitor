package com.shubham225.jobmonitor.configuration;

import com.shubham225.jobmonitor.erp.ERPClient;
import com.shubham225.jobmonitor.erp.impl.ERPClientImpl;
import com.shubham225.jobmonitor.mail.MailClient;
import com.shubham225.jobmonitor.mail.impl.MailClientImpl;
import com.shubham225.jobmonitor.windows.event.EventLogClient;
import com.shubham225.jobmonitor.windows.event.impl.EventLogClientImpl;
import com.shubham225.jobmonitor.windows.scheduler.TaskSchedulerClient;
import com.shubham225.jobmonitor.windows.scheduler.impl.TaskSchedulerClientImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AppConfig {
    private final MailConfig mailConfig;

    @Bean
    public ERPClient erpClient() {
        return new ERPClientImpl();
    }

    @Bean
    public TaskSchedulerClient taskSchedulerClient() {
        return new TaskSchedulerClientImpl();
    }

    @Bean
    public MailClient mailClient() {
        return new MailClientImpl(mailConfig.getUser(), mailConfig.getPassword());
    }

    @Bean
    public EventLogClient eventLogClient() {
        return new EventLogClientImpl();
    }
}
