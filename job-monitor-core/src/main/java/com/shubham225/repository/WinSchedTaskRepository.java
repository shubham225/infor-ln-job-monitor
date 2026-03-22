package com.shubham225.repository;

import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.model.key.WinSchedTaskId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WinSchedTaskRepository extends JpaRepository<WinSchedTask, WinSchedTaskId> {
}
