package com.shubham225.model.entity;

import com.shubham225.model.enums.ERPJobStatus;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExclusionJobStatus extends BaseEntity {
    private String hostName;
    private ERPJobStatus status;
}
