package com.hadasim.services;

import com.hadasim.entities.Location;
import com.hadasim.repositories.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LocationService {
    private LocationRepository locationRepository;

    public Location AddLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location findLocationByUserId(String userId) {
        return locationRepository.findByUserId(userId);
    }
}