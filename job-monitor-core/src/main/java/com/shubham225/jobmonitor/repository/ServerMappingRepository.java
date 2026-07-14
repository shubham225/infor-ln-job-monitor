package com.shubham225.jobmonitor.repository;

import com.shubham225.jobmonitor.model.entity.ServerMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServerMappingRepository extends JpaRepository<ServerMapping, Long> {
    Optional<ServerMapping> findFirstByHostName(String hostname);
}
