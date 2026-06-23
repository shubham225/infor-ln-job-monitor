package com.shubham225.repository;

import com.shubham225.model.entity.ExclusionErrorMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExclusionErrorMessageRepository extends JpaRepository<ExclusionErrorMessage, Long> {
}
