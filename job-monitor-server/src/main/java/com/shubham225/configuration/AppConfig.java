package com.shubham225.configuration;

import com.shubham225.erp.ERPClient;
import com.shubham225.erp.impl.ERPClientImpl;
import com.shubham225.mail.MailClient;
import com.shubham225.mail.impl.MailClientImpl;
import com.shubham225.windows.event.EventLogClient;
import com.shubham225.windows.event.impl.EventLogClientImpl;
import com.shubham225.windows.scheduler.TaskSchedulerClient;
import com.shubham225.windows.scheduler.impl.TaskSchedulerClientImpl;
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
