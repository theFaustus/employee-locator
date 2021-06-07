package com.evil.inc.employeelocator.service;

import com.evil.inc.employeelocator.domain.GeoLocation;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.PlacesSearchResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class GeoLocationServiceImpl implements GeoLocationService {

    private GeoApiContext geoApiContext;

    @Autowired
    public GeoLocationServiceImpl(@Value("${gmaps.api.key}") String apiKey) {
        geoApiContext = new GeoApiContext.Builder().apiKey(apiKey)
                .maxRetries(2)
                .connectTimeout(10L, TimeUnit.SECONDS)
                .build();
    }

    @Override
    public Optional<GeoLocation> computeGeoLocation(String fullAddressLine) {
        final PlacesSearchResponse placesSearchResponse;
        try {
            placesSearchResponse = PlacesApi.textSearchQuery(geoApiContext,
                                                             fullAddressLine).await();
            log.info("Processing address line using PlacesApi.textSearchQuery {}", fullAddressLine);
            if (placesSearchResponse != null && placesSearchResponse.results.length > 0) {
                log.info("Obtained following predictions using PlacesApi.textSearchQuery {}",
                         Arrays.toString(placesSearchResponse.results));
                final GeocodingResult[] geocodingResults = GeocodingApi.newRequest(geoApiContext)
                        .place(placesSearchResponse.results[0].placeId)
                        .await();
                log.info("Processing address line using GeocodingApi.newRequest {}", fullAddressLine);
                if (geocodingResults != null && geocodingResults.length > 0) {
                    log.info("Obtained following geocoding results using GeocodingApi.newRequest {}",
                             Arrays.toString(geocodingResults));
                    final String placeId = geocodingResults[0].placeId;
                    final double latitude = geocodingResults[0].geometry.location.lat;
                    final double longitude = geocodingResults[0].geometry.location.lng;
                    final GeoLocation geoLocation = new GeoLocation(latitude, longitude);
                    log.info("Computed following coordinates using GeocodingApi.newRequest {}", geoLocation);
                    return Optional.of(geoLocation);
                } else {
                    log.warn("No coordinates found using GeocodingApi.newRequest {}", fullAddressLine);
                }
            } else {
                log.warn("No coordinates found using PlacesApi.textSearchQuery {}", fullAddressLine);
            }
        } catch (ApiException | InterruptedException | IOException e) {
            log.error("Encountered error [{}] using GoogleMapsApi for address {} : {}", e.getMessage(), fullAddressLine, e);
        }

        return Optional.empty();
    }
}
