package com.shubham225.service;

import com.shubham225.model.dto.ExclusionErrorMessageDTO;
import com.shubham225.model.dto.ExclusionJobDTO;
import com.shubham225.model.dto.ExclusionJobStatusDTO;

import java.util.List;

public interface ExclusionSettingService {
    ExclusionErrorMessageDTO addErrorMessageExclusion(ExclusionErrorMessageDTO exclusionErrorMessageDTO);
    ExclusionJobDTO addJobExclusion(ExclusionJobDTO exclusionJobDTO);
    ExclusionJobStatusDTO addJobExclusionStatus(ExclusionJobStatusDTO exclusionJobDTO);
    ExclusionErrorMessageDTO removeErrorMessageExclusion(Long id);
    ExclusionJobDTO removeJobExclusion(Long id);
    ExclusionJobStatusDTO removeJobExclusionStatus(Long id);
    List<ExclusionErrorMessageDTO> getAllErrorMessageExclusion();
    List<ExclusionJobStatusDTO> getAllJobExclusionStatus();
    List<ExclusionJobDTO> getAllJobExclusion();
}
