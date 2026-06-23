package com.shubham225.repository;

import com.shubham225.model.entity.ServerMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ServerMappingRepository extends JpaRepository<ServerMapping, Long> {
    Optional<ServerMapping> findFirstByHostName(String hostname);
}
