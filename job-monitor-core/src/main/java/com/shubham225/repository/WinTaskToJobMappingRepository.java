package com.shubham225.repository;

import com.shubham225.model.entity.WinTaskToJobMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WinTaskToJobMappingRepository extends JpaRepository<WinTaskToJobMapping, Long> {
    //TODO : find better alternative
    Optional<WinTaskToJobMapping> findFirstByJobCodeAndCompany(String jobName, String jobCompany);
}
