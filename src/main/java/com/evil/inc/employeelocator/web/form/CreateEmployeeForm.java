package com.evil.inc.employeelocator.web.form;

import com.evil.inc.employeelocator.domain.JobPosition;
import com.evil.inc.employeelocator.domain.Role;
import lombok.Data;


@Data
public class CreateEmployeeForm {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;

    private String street;
    private String city;
    private String country;

    private Role role;
    private JobPosition jobPosition;
}
