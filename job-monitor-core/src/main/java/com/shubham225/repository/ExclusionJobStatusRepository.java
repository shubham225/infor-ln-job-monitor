package com.shubham225.repository;

import com.shubham225.model.entity.ExclusionJobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExclusionJobStatusRepository extends JpaRepository<ExclusionJobStatus, Long> {
}
