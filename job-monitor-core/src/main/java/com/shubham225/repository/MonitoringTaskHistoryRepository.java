package com.shubham225.repository;

import com.shubham225.model.entity.MonitoringTaskHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MonitoringTaskHistoryRepository extends JpaRepository<MonitoringTaskHistory, UUID> {
}
