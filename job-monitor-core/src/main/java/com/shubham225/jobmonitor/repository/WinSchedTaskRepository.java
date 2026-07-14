package com.shubham225.jobmonitor.repository;

import com.shubham225.jobmonitor.model.entity.WinSchedTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WinSchedTaskRepository extends JpaRepository<WinSchedTask, Long> {
}
