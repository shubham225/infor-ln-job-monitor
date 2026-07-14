package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.model.entity.MonitoringTaskHistory;
import com.shubham225.jobmonitor.repository.MonitoringTaskHistoryRepository;
import com.shubham225.jobmonitor.service.MonitoringTaskHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonitoringTaskHistoryServiceImpl implements MonitoringTaskHistoryService {
    private final MonitoringTaskHistoryRepository monitoringTaskHistoryRepository;

    @Override
    public MonitoringTaskHistory saveMonitoringTaskHistory(MonitoringTaskHistory history) {
        return monitoringTaskHistoryRepository.save(history);
    }

    @Override
    public List<MonitoringTaskHistory> findAllMonitoringTaskHistory() {
        return monitoringTaskHistoryRepository.findAll();
    }
}
