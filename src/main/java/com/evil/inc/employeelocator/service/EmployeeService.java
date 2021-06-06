package com.evil.inc.employeelocator.service;

import com.evil.inc.employeelocator.domain.Employee;
import com.evil.inc.employeelocator.web.form.CreateEmployeeForm;

import java.util.List;

public interface EmployeeService {
    void create(CreateEmployeeForm form);
    public List<Employee> getAll();
}
