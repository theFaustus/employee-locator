package com.evil.inc.employeelocator.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeoLocation {

    private Double latitude;
    private Double longitude;

}
