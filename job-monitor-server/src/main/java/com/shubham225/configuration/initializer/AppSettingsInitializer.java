package com.shubham225.configuration.initializer;

import com.shubham225.model.entity.AppSettings;
import com.shubham225.repository.AppSettingsRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppSettingsInitializer {

    private final AppSettingsRepository repository;

    @PostConstruct
    public void init() {
        repository.findById(1L).orElseGet(() -> {
            AppSettings settings = new AppSettings();
            settings.setId(1L);
            settings.setMailTo("shubhamshinde225@gmail.com");
            settings.setMailCc("");
            settings.setAllowedJobStartDelay(10);
            settings.setEmailAlerts(true);
            settings.setErrorKeywords("Error|Failed");
            return repository.save(settings);
        });
    }
}