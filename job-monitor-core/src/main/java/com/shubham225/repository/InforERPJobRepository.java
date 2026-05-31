package com.shubham225.repository;

import com.shubham225.model.entity.InforERPJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InforERPJobRepository extends JpaRepository<InforERPJob, UUID> {
}
