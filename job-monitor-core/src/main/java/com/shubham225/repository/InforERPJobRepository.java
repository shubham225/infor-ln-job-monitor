package com.shubham225.repository;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.key.ERPJobId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InforERPJobRepository extends JpaRepository<InforERPJob, ERPJobId> {
}
