package com.hadasim.controllers;

import com.hadasim.dtos.LocationDto;
import com.hadasim.entities.Location;
import com.hadasim.services.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/Locations")
@AllArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @PostMapping("/add")
    public Location addLocation(@RequestBody LocationDto locationDto) {
        return locationService.addLocation(locationDto);
    }

    @GetMapping("/get/{userId}")
    public Location getLocation(@PathVariable String userId) {
        return locationService.findLocationByUserId(userId);
    }
}
