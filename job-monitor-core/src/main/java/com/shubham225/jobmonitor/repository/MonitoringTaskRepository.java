package com.shubham225.jobmonitor.repository;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.model.enums.MonitoringStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface MonitoringTaskRepository extends JpaRepository<MonitoringTask, Long> {
    List<MonitoringTask> findAllByStatusIn(Collection<MonitoringStatus> statuses);
}
