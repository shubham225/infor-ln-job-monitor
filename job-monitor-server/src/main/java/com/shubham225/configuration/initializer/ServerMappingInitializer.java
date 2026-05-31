package com.shubham225.configuration.initializer;

import com.shubham225.model.entity.ServerMapping;
import com.shubham225.repository.ServerMappingRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServerMappingInitializer {
    private final ServerMappingRepository serverMappingRepository;

    @PostConstruct
    public void init() {
        if (serverMappingRepository.count() == 0) {
            ServerMapping mapping = new ServerMapping();
            mapping.setHostName("172.24.50.124");
            mapping.setApiUrl("http://localhost:3000/getJobDetails");

            serverMappingRepository.save(mapping);
        }
    }
}
