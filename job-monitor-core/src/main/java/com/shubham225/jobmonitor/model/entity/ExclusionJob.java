package com.shubham225.jobmonitor.model.entity;

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
public class ExclusionJob extends BaseEntity{
    private String hostName;
    private String jobName;
    private String company;
}
