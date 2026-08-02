package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.exception.JobTaskMappingNotFoundException;
import com.shubham225.jobmonitor.model.dto.TaskJobMappingDTO;
import com.shubham225.jobmonitor.model.entity.WinTaskToJobMapping;
import com.shubham225.jobmonitor.model.mapper.TaskJobMappingMapper;
import com.shubham225.jobmonitor.repository.WinTaskToJobMappingRepository;
import com.shubham225.jobmonitor.service.WinTaskToJobMappingService;
import com.shubham225.jobmonitor.util.FileUtils;
import com.shubham225.jobmonitor.windows.scheduler.TaskSchedulerClient;
import com.shubham225.jobmonitor.windows.scheduler.domain.ScheduledTask;
import com.shubham225.jobmonitor.windows.scheduler.domain.TaskQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class WinTaskToJobMappingServiceImpl implements WinTaskToJobMappingService {
    private final WinTaskToJobMappingRepository winTaskToJobMappingRepository;
    private final TaskSchedulerClient schedulerClient;
    private final TaskJobMappingMapper taskJobMappingMapper;

    @Override
    public long countWinTaskToJobMapping() {
        return winTaskToJobMappingRepository.count();
    }

    @Override
    public String findWinTaskOfJob(String jobName, String jobCompany) {
        log.info("finding win task associated with the job {} and company {}", jobName, jobCompany);
        return winTaskToJobMappingRepository.findFirstByJobCodeAndCompany(jobName, jobCompany)
                .map(WinTaskToJobMapping::getTaskName)
                .orElseThrow(() ->
                        new JobTaskMappingNotFoundException(
                                MessageFormat.format("Mapping not found for job: {0}, company: {1}", jobName, jobCompany)
                        )
                );
    }

    @Override
    public void generateWinTaskToJobMapping() {
        deleteAllJobTaskMapping();
        log.info("generating job and task mappings");
        List<ScheduledTask> tasks = schedulerClient.findAllWinSchedTask(new TaskQuery("", ""));
        generateMapping(tasks);
    }

    @Override
    public List<TaskJobMappingDTO> getTaskJobMappings() {
        return winTaskToJobMappingRepository.findAll()
                .stream()
                .map(taskJobMappingMapper::toDTO)
                .toList();
    }

    @Override
    public boolean isLastGeneratedMappingOlderThanOneDay() {
        WinTaskToJobMapping lastGeneratedMapping = winTaskToJobMappingRepository
                                                    .findFirstByOrderByCreatedOnDesc()
                                                    .orElse(null);
        if (lastGeneratedMapping == null) {
            return true;
        }

        return lastGeneratedMapping.getCreatedOn().isBefore(LocalDateTime.now().minusDays(1));
    }

    private void deleteAllJobTaskMapping() {
        log.info("deleting existing job and task mappings");
        winTaskToJobMappingRepository.deleteAll();
    }

    private List<WinTaskToJobMapping> generateMapping(List<ScheduledTask> tasks) {
        List<WinTaskToJobMapping> mappings = new ArrayList<>();

        for (ScheduledTask task : tasks) {
            String action = task.getAction();

            if (action == null || action.isEmpty()) continue;

            String batFilePath = action.split("\\s+")[0];

            Path path;
            try {
                path = Paths.get(batFilePath);
            } catch (InvalidPathException e) {
                System.out.println("Invalid path, skipping task: " + task.getTaskName());
                continue;
            }

            if (!Files.exists(path) || !Files.isRegularFile(path) || !batFilePath.toLowerCase().endsWith(".bat")) {
                System.out.println("Batch file not found for task: " + task.getTaskName());
                continue;
            }

            try {
                List<String> lines = Files.readAllLines(path);
                if (lines.isEmpty()) continue;

                String firstLine = lines.get(0).trim();
                // Example: call D:\path\StartJob.bat D:\path\job_550.bwc TEST_JOB_Error_2

                // Only include lines starting with "call"
                if (!firstLine.toLowerCase().startsWith("call ")) continue;

                String[] parts = firstLine.split("\\s+");
                if (parts.length < 2) continue;

                // Assume last argument is ERP job name
                String erpJobName = parts[parts.length - 1];
                String bwcFilepath = parts[parts.length - 2];

                Map<String, Map<String, String>> data;
                try {
                    // Parse INI file
                    data = FileUtils.parseIniFile(bwcFilepath);
                } catch (IOException e) {
                    log.error("ERROR: I/O error while reading BWC file. Reason: {}", e.getMessage());
                    continue;
                }

                String command = data.get("ApplicationServer").get("command");
                String hostname = data.get("Remote").get("hostname");

                // Extract BSE_COMPNR from command
                String companyCode = FileUtils.extractCompany(command);

                mappings.add(new WinTaskToJobMapping(hostname, task.getTaskName(), erpJobName, companyCode));
            } catch (IOException e) {
                log.error("Error reading batch file for task: {}" ,task.getTaskName());
            }
        }

        return saveWinTaskToJobMapping(mappings);
    }

    private WinTaskToJobMapping saveWinTaskToJobMapping(WinTaskToJobMapping mapping) {
        return winTaskToJobMappingRepository.save(mapping);
    }

    private List<WinTaskToJobMapping> saveWinTaskToJobMapping(List<WinTaskToJobMapping> mappings) {
        return winTaskToJobMappingRepository.saveAll(mappings);
    }
}
