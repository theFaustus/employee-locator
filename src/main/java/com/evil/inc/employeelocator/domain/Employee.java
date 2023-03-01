package com.evil.inc.employeelocator.domain;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee extends AbstractEntity {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;

    @Embedded
    private Address address;

    @Embedded
    private GeoLocation geoLocation;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private JobPosition jobPosition;

    private boolean geoProcessed = false;

    public Employee(final String firstName, final String lastName, final String username, final String email,
                    final Address address, final Role role, final JobPosition jobPosition) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.address = address;
        this.role = role;
        this.jobPosition = jobPosition;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Employee that = (Employee) o;
        return this.id != null && that.id.equals(this.id);
    }

    public String getFullName() {
        return firstName + ", " + lastName;
    }

    public String getFullAddress() {
        return this.address.toString();
    }

    public void setAddress(final Address address) {
        this.address = address;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
