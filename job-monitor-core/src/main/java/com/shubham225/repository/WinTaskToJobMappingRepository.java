package com.shubham225.repository;

import com.shubham225.model.entity.WinTaskToJobMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WinTaskToJobMappingRepository extends JpaRepository<WinTaskToJobMapping, UUID> {
    //TODO : find better alternative
    Optional<WinTaskToJobMapping> findFirstByJobCodeAndCompany(String jobName, String jobCompany);
}
