package com.shubham225.model.entity;

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
// TODO: Temp class has only jobname and taskname will have to include company and other details
public class WinTaskToJobMapping extends BaseEntity{
    public String jobName;
    public String jobCompany;
    public String taskName;
}
