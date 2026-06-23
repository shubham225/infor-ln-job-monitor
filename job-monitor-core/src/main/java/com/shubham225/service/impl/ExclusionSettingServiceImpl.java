package com.shubham225.service.impl;

import com.shubham225.model.dto.ExclusionErrorMessageDTO;
import com.shubham225.model.dto.ExclusionJobDTO;
import com.shubham225.model.dto.ExclusionJobStatusDTO;
import com.shubham225.model.entity.ExclusionErrorMessage;
import com.shubham225.model.entity.ExclusionJob;
import com.shubham225.model.entity.ExclusionJobStatus;
import com.shubham225.model.mapper.ExclusionErrorMessageMapper;
import com.shubham225.model.mapper.ExclusionJobMapper;
import com.shubham225.model.mapper.ExclusionJobStatusMapper;
import com.shubham225.repository.ExclusionErrorMessageRepository;
import com.shubham225.repository.ExclusionJobRepository;
import com.shubham225.repository.ExclusionJobStatusRepository;
import com.shubham225.service.ExclusionSettingService;
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
    public ExclusionErrorMessage addErrorMessageExclusion(ExclusionErrorMessageDTO exclusionErrorMessageDTO) {
        ExclusionErrorMessage exclusionErrorMessage = exclusionErrorMessageMapper.toEntity(exclusionErrorMessageDTO);
        return exclusionErrorMessageRepository.save(exclusionErrorMessage);
    }

    @Override
    public ExclusionJob addJobExclusion(ExclusionJobDTO exclusionJobDTO) {
        ExclusionJob exclusionJob = exclusionJobMapper.toEntity(exclusionJobDTO);
        return exclusionJobRepository.save(exclusionJob);
    }

    @Override
    public ExclusionJobStatus addJobExclusionStatus(ExclusionJobStatusDTO exclusionJobDTO) {
        ExclusionJobStatus exclusionJobStatus = exclusionJobStatusMapper.toEntity(exclusionJobDTO);
        return exclusionJobStatusRepository.save(exclusionJobStatus);
    }

    @Override
    public ExclusionErrorMessage removeErrorMessageExclusion(Long id) {
        ExclusionErrorMessage exclusionErrorMessage = exclusionErrorMessageRepository.findById(id).orElse(null);

        if (exclusionErrorMessage != null) exclusionErrorMessageRepository.delete(exclusionErrorMessage);

        return exclusionErrorMessage == null ? new ExclusionErrorMessage() : exclusionErrorMessage;
    }

    @Override
    public ExclusionJob removeJobExclusion(Long id) {
        ExclusionJob exclusionJob = exclusionJobRepository.findById(id).orElse(null);

        if (exclusionJob != null) exclusionJobRepository.delete(exclusionJob);

        return exclusionJob ==  null ? new ExclusionJob() : exclusionJob;
    }

    @Override
    public ExclusionJobStatus removeJobExclusionStatus(Long id) {
        ExclusionJobStatus  exclusionJobStatus = exclusionJobStatusRepository.findById(id).orElse(null);

        if (exclusionJobStatus != null) exclusionJobStatusRepository.delete(exclusionJobStatus);

        return exclusionJobStatus == null ? new ExclusionJobStatus() : exclusionJobStatus;
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
