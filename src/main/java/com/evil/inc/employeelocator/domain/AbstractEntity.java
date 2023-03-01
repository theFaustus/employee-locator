package com.evil.inc.employeelocator.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;


@Data
@MappedSuperclass
public class AbstractEntity {
    @Id
    @SequenceGenerator(name = "eloc_sequence", sequenceName = "eloc_sequence", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eloc_sequence")
    protected Long id;
}
