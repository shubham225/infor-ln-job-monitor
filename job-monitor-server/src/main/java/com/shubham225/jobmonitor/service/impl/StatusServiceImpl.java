package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.model.dto.StatusDTO;
import com.shubham225.jobmonitor.service.StatusService;
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
