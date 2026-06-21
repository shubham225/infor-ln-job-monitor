package com.shubham225.configuration.initializer;

import com.shubham225.model.entity.AppSetting;
import com.shubham225.repository.AppSettingRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppSettingsInitializer {

    private final AppSettingRepository repository;

    @PostConstruct
    public void init() {
        repository.findById(1L).orElseGet(() -> {
            AppSetting settings = new AppSetting();
            settings.setId(1L);
            settings.setMailTo("shubhamshinde225@gmail.com");
            settings.setMailCc("");
            settings.setAllowedJobStartDelay(10);
            settings.setEmailAlerts(true);
            settings.setErrorKeywords("Error|Failed");
            settings.setSendMonthlyReports(false);
            settings.setTaskReleaseDelay(10);
            return repository.save(settings);
        });
    }
}