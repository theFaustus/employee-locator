package com.evil.inc.employeelocator.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    private String street;
    private String city;
    private String country;

    @Override
    public String toString() {
        return String.join(", ", street, city, country);
    }
}
