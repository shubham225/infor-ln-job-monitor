package com.shubham225.jobmonitor.repository;

import com.shubham225.jobmonitor.model.entity.InforERPJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InforERPJobRepository extends JpaRepository<InforERPJob, Long> {
}
