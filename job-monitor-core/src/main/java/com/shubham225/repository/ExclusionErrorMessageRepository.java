package com.shubham225.repository;

import com.shubham225.model.entity.ExclusionErrorMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExclusionErrorMessageRepository extends JpaRepository<ExclusionErrorMessage, Long> {
    Optional<ExclusionErrorMessage> findByHostNameAndMessage(String hostName, String message);
}
