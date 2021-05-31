package com.evil.inc.employeelocator.repo;

import com.evil.inc.employeelocator.domain.Employee;
import com.evil.inc.employeelocator.web.controller.EmployeeController;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
