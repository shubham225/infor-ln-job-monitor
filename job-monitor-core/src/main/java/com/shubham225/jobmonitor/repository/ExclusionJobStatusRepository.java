package com.shubham225.jobmonitor.repository;

import com.shubham225.jobmonitor.model.entity.ExclusionJobStatus;
import com.shubham225.jobmonitor.model.enums.ERPJobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExclusionJobStatusRepository extends JpaRepository<ExclusionJobStatus, Long> {
    Optional<ExclusionJobStatus> findByHostNameAndStatus(String hostName, ERPJobStatus status);
}
