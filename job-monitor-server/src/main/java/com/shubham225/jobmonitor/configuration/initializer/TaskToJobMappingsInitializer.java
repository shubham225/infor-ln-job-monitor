package com.shubham225.jobmonitor.configuration.initializer;

import com.shubham225.jobmonitor.service.WinTaskToJobMappingService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskToJobMappingsInitializer {
    private final WinTaskToJobMappingService winTaskToJobMappingService;

    @PostConstruct
    public void init() {
        if (winTaskToJobMappingService.countWinTaskToJobMapping() == 0) {
            winTaskToJobMappingService.generateWinTaskToJobMapping();
        }
    }
}
