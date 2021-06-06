package com.evil.inc.employeelocator.web.controller;

import com.evil.inc.employeelocator.domain.Address;
import com.evil.inc.employeelocator.domain.Employee;
import com.evil.inc.employeelocator.domain.JobPosition;
import com.evil.inc.employeelocator.domain.Role;
import com.evil.inc.employeelocator.service.EmployeeService;
import com.evil.inc.employeelocator.web.form.CreateEmployeeForm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    @Value("${gmaps.api.key}")
    private String gmapsApiKey;

    @GetMapping
    public ModelAndView viewAllUsers() {
        final List<Employee> employees = employeeService.getAll();
        final ModelAndView modelAndView = new ModelAndView("employees");
        modelAndView.addObject("employees", employees);
        modelAndView.addObject("gmapsApiKey", gmapsApiKey);
        modelAndView.addObject("jobPositions", JobPosition.values());
        modelAndView.addObject("createEmployeeForm", new CreateEmployeeForm());
        modelAndView.addObject("roles", Role.values());
        return modelAndView;
    }

    @PostMapping
    public ModelAndView createEmployee(@ModelAttribute CreateEmployeeForm employeeForm) {
        employeeService.create(employeeForm);
        return new ModelAndView("redirect:/");
    }

    @GetMapping("/api/employees")
    @ResponseBody
    public ResponseEntity<List<Employee>> getAllUsers() {
        final List<Employee> employees = employeeService.getAll().stream().filter(e -> e.getGeoLocation() != null).collect(Collectors.toList());
        return ResponseEntity.ok(employees);
    }
}
