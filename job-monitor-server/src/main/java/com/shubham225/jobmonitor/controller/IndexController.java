package com.shubham225.jobmonitor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("/")
    String getIndex(final Model model) {
        return "redirect:/index.html";
    }

}
