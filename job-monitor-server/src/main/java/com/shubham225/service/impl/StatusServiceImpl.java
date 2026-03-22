package com.shubham225.service.impl;

import com.shubham225.model.dto.StatusDTO;
import com.shubham225.service.StatusService;
import org.springframework.stereotype.Service;

@Service
public class StatusServiceImpl implements StatusService {
    @Override
    public StatusDTO getStatus() {
        return StatusDTO.builder()
                .status("UP")
                .build();
    }
}
