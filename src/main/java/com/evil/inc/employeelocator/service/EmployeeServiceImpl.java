package com.evil.inc.employeelocator.service;

import com.evil.inc.employeelocator.domain.Address;
import com.evil.inc.employeelocator.domain.Employee;
import com.evil.inc.employeelocator.repo.EmployeeRepository;
import com.evil.inc.employeelocator.web.form.CreateEmployeeForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final GeoLocationService geoLocationService;

    @Transactional
    public void create(CreateEmployeeForm form) {
        final Employee employee = new Employee(form.getFirstName(), form.getLastName(), form.getUsername(),
                                               form.getEmail(),
                                               new Address(form.getStreet(), form.getCity(), form.getCountry()),
                                               form.getRole(), form.getJobPosition());
        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public List<Employee> getAll() {
        final List<Employee> employees = employeeRepository.findAll();
        employees.forEach(this::computeAddress);
        return employees;
    }

    private void computeAddress(Employee employee) {
        if (employee.getAddress() != null && employee.getGeoLocation() == null && !employee.isGeoProcessed()) {
            geoLocationService.computeGeoLocation(employee.getAddress().toString())
                    .ifPresent(employee::setGeoLocation);
            employee.setGeoProcessed(true);
        }
    }
}
