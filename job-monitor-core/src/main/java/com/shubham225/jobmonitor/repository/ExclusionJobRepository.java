package com.shubham225.jobmonitor.repository;

import com.shubham225.jobmonitor.model.entity.ExclusionJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExclusionJobRepository extends JpaRepository<ExclusionJob, Long> {
    Optional<ExclusionJob> findByHostNameAndJobNameAndCompany(
                                                        String hostName,
                                                        String jobName,
                                                        String company);

}
