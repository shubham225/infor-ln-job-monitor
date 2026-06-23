package com.shubham225.repository;

import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.MonitoringStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface MonitoringTaskRepository extends JpaRepository<MonitoringTask, Long> {
    List<MonitoringTask> findAllByStatusIn(Collection<MonitoringStatus> statuses);
}
