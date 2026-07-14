package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.model.dto.ExclusionErrorMessageDTO;
import com.shubham225.jobmonitor.model.dto.ExclusionJobDTO;
import com.shubham225.jobmonitor.model.dto.ExclusionJobStatusDTO;
import com.shubham225.jobmonitor.model.entity.ExclusionErrorMessage;
import com.shubham225.jobmonitor.model.entity.ExclusionJob;
import com.shubham225.jobmonitor.model.entity.ExclusionJobStatus;
import com.shubham225.jobmonitor.model.mapper.ExclusionErrorMessageMapper;
import com.shubham225.jobmonitor.model.mapper.ExclusionJobMapper;
import com.shubham225.jobmonitor.model.mapper.ExclusionJobStatusMapper;
import com.shubham225.jobmonitor.repository.ExclusionErrorMessageRepository;
import com.shubham225.jobmonitor.repository.ExclusionJobRepository;
import com.shubham225.jobmonitor.repository.ExclusionJobStatusRepository;
import com.shubham225.jobmonitor.service.ExclusionSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExclusionSettingServiceImpl implements ExclusionSettingService {
    private final ExclusionErrorMessageRepository exclusionErrorMessageRepository;
    private final ExclusionJobRepository exclusionJobRepository;
    private final ExclusionJobStatusRepository exclusionJobStatusRepository;
    private final ExclusionErrorMessageMapper exclusionErrorMessageMapper;
    private final ExclusionJobStatusMapper exclusionJobStatusMapper;
    private final ExclusionJobMapper exclusionJobMapper;

    @Override
    public ExclusionErrorMessageDTO addErrorMessageExclusion(ExclusionErrorMessageDTO exclusionErrorMessageDTO) {
        ExclusionErrorMessage exclusionErrorMessage = exclusionErrorMessageMapper.toEntity(exclusionErrorMessageDTO);
        exclusionErrorMessage = exclusionErrorMessageRepository.save(exclusionErrorMessage);
        return exclusionErrorMessageMapper.toDto(exclusionErrorMessage);
    }

    @Override
    public ExclusionJobDTO addJobExclusion(ExclusionJobDTO exclusionJobDTO) {
        ExclusionJob exclusionJob = exclusionJobMapper.toEntity(exclusionJobDTO);
        exclusionJob = exclusionJobRepository.save(exclusionJob);

        return exclusionJobMapper.toDto(exclusionJob);
    }

    @Override
    public ExclusionJobStatusDTO addJobExclusionStatus(ExclusionJobStatusDTO exclusionJobDTO) {
        ExclusionJobStatus exclusionJobStatus = exclusionJobStatusMapper.toEntity(exclusionJobDTO);
        exclusionJobStatus = exclusionJobStatusRepository.save(exclusionJobStatus);
        return exclusionJobStatusMapper.toDto(exclusionJobStatus);
    }

    @Override
    public ExclusionErrorMessageDTO removeErrorMessageExclusion(Long id) {
        ExclusionErrorMessage exclusionErrorMessage = exclusionErrorMessageRepository.findById(id).orElse(null);

        if (exclusionErrorMessage != null)
            exclusionErrorMessageRepository.delete(exclusionErrorMessage);
        else
            exclusionErrorMessage = new ExclusionErrorMessage();

        return exclusionErrorMessageMapper.toDto(exclusionErrorMessage);
    }

    @Override
    public ExclusionJobDTO removeJobExclusion(Long id) {
        ExclusionJob exclusionJob = exclusionJobRepository.findById(id).orElse(null);

        if (exclusionJob != null)
            exclusionJobRepository.delete(exclusionJob);
        else
            exclusionJob = new ExclusionJob();

        return exclusionJobMapper.toDto(exclusionJob);
    }

    @Override
    public ExclusionJobStatusDTO removeJobExclusionStatus(Long id) {
        ExclusionJobStatus  exclusionJobStatus = exclusionJobStatusRepository.findById(id).orElse(null);

        if (exclusionJobStatus != null)
            exclusionJobStatusRepository.delete(exclusionJobStatus);
        else
            exclusionJobStatus = new ExclusionJobStatus();

        return exclusionJobStatusMapper.toDto(exclusionJobStatus);
    }

    @Override
    public List<ExclusionErrorMessageDTO> getAllErrorMessageExclusion() {
        return exclusionErrorMessageRepository.findAll()
                .stream()
                .map(exclusionErrorMessageMapper::toDto)
                .toList();
    }

    @Override
    public List<ExclusionJobStatusDTO> getAllJobExclusionStatus() {
        return exclusionJobStatusRepository.findAll()
                .stream()
                .map(exclusionJobStatusMapper::toDto)
                .toList();
    }

    @Override
    public List<ExclusionJobDTO> getAllJobExclusion() {
        return exclusionJobRepository.findAll()
                .stream()
                .map(exclusionJobMapper::toDto)
                .toList();
    }
}
