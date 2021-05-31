package com.evil.inc.employeelocator.service;

import com.evil.inc.employeelocator.domain.Employee;

import java.util.List;

public interface EmployeeService {
    void create(Employee employee);
    public List<Employee> getAll();
}
