package com.evil.inc.employeelocator.domain;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.SequenceGenerator;

@Data
@MappedSuperclass
public class AbstractEntity {
    @Id
    @SequenceGenerator(name = "eloc_sequence", sequenceName = "eloc_sequence", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "eloc_sequence")
    protected Long id;
}
