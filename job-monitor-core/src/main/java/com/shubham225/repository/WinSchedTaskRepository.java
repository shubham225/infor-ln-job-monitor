package com.shubham225.repository;

import com.shubham225.model.entity.WinSchedTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WinSchedTaskRepository extends JpaRepository<WinSchedTask, UUID> {
}
