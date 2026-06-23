package com.shubham225.service;

import com.shubham225.model.dto.ExclusionErrorMessageDTO;
import com.shubham225.model.dto.ExclusionJobDTO;
import com.shubham225.model.dto.ExclusionJobStatusDTO;
import com.shubham225.model.entity.ExclusionErrorMessage;
import com.shubham225.model.entity.ExclusionJob;
import com.shubham225.model.entity.ExclusionJobStatus;

import java.util.List;

public interface ExclusionSettingService {
    ExclusionErrorMessage addErrorMessageExclusion(ExclusionErrorMessageDTO exclusionErrorMessageDTO);
    ExclusionJob addJobExclusion(ExclusionJobDTO exclusionJobDTO);
    ExclusionJobStatus addJobExclusionStatus(ExclusionJobStatusDTO exclusionJobDTO);
    ExclusionErrorMessage removeErrorMessageExclusion(Long id);
    ExclusionJob removeJobExclusion(Long id);
    ExclusionJobStatus removeJobExclusionStatus(Long id);
    List<ExclusionErrorMessageDTO> getAllErrorMessageExclusion();
    List<ExclusionJobStatusDTO> getAllJobExclusionStatus();
    List<ExclusionJobDTO> getAllJobExclusion();
}
