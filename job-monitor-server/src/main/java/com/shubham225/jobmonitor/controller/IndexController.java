package com.shubham225.jobmonitor.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Set;

@Controller
public class IndexController {
    @GetMapping("/")
    String getIndex(final Model model) {
        return "redirect:/index.html";
    }

    @GetMapping("/help")
    public String help() {
        return "forward:/help.html";
    }

    @GetMapping("/settings")
    public String settings() {
        return "forward:/settings.html";
    }

    @GetMapping("/reports")
    public String reports() {
        return "forward:/reports.html";
    }

    @GetMapping("/history")
    public String history() {
        return "forward:/history.html";
    }

    @GetMapping("/tasks")
    public String tasks() {
        return "forward:/tasks.html";
    }

    @GetMapping("/server-mapping")
    public String serverMapping() {
        return "forward:/server-mapping.html";
    }

    @GetMapping("/task-job-mapping")
    public String taskJobMapping() {
        return "forward:/task-job-mapping.html";
    }
}
