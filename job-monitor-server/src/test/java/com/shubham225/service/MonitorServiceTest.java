package com.shubham225.service;

import com.shubham225.service.impl.WinTaskToJobMappingServiceImpl;
import com.shubham225.windows.event.EventLogClient;
import com.shubham225.windows.event.domain.EventLogQuery;
import com.shubham225.windows.event.impl.EventLogClientImpl;
import com.shubham225.windows.scheduler.TaskSchedulerClient;
import com.shubham225.windows.scheduler.domain.ScheduledTask;
import com.shubham225.windows.scheduler.domain.TaskQuery;
import com.shubham225.windows.scheduler.impl.TaskSchedulerClientImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


//@SpringBootTest
class MonitorServiceTest {
    TaskSchedulerClient client = new TaskSchedulerClientImpl();
    EventLogClient eventLogClient =  new EventLogClientImpl();
    @Autowired
    WinTaskToJobMappingServiceImpl winTaskToJobMappingService;

//    @Test
    void testSceduler() {
        ScheduledTask task = client.findWinSchedTask(new TaskQuery("TEST_JOB_RUN", "\\"));
        System.out.println(task);

//        List<ScheduledTask> tasks = client.findAllWinSchedTask(new TaskQuery("TEST_JOB_RUN", "\\"));
//        tasks.forEach(System.out::println);
    }

//    @Test
    void testEventLogs() {
        int i = eventLogClient.generateEventViewerLog(new EventLogQuery("Application", LocalDateTime.now().minusHours(24), LocalDateTime.now(), Path.of("D:/Test" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("_dd_MM_yyyy_hh_mm_ss")) +".evtx")));
        System.out.println(i);
    }

//    @Test
    void testMapper() {
        winTaskToJobMappingService.generateWinTaskToJobMapping();
        String taskName1 = winTaskToJobMappingService.findWinTaskOfJob("TEST_JOB_Error_2", "");
        System.out.println("Task found blank company: " + taskName1);
        String taskName = winTaskToJobMappingService.findWinTaskOfJob("TEST_JOB_Error_2", "550");
        System.out.println("Task found [550]: " + taskName);
    }

}