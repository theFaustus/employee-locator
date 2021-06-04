package com.evil.inc.employeelocator.web.controller;

import com.evil.inc.employeelocator.domain.Employee;
import com.evil.inc.employeelocator.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    @Value("${gmaps.api.key}")
    private String gmapsApiKey;

    @GetMapping
    public ModelAndView viewAllUsers(){
        final List<Employee> employees = employeeService.getAll();
        final ModelAndView modelAndView = new ModelAndView("employees");
        modelAndView.addObject("employees", employees);
        modelAndView.addObject("gmapsApiKey", gmapsApiKey);
        return modelAndView;
    }
}
