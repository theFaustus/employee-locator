package com.evil.inc.employeelocator.service;


import com.evil.inc.employeelocator.domain.GeoLocation;

import java.util.Optional;

public interface GeoLocationService {
    Optional<GeoLocation> computeGeoLocation(String fullAddressLine);
}
