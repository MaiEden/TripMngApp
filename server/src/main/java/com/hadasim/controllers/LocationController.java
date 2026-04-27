package com.hadasim.controllers;

import com.hadasim.dtos.LocationDto;
import com.hadasim.entities.Location;
import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.entities.User;
import com.hadasim.services.LocationService;
import com.hadasim.services.StudentService;
import com.hadasim.services.TeacherService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/Locations")
@AllArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @PostMapping("/Add")
    public Location AddLocation(@RequestBody LocationDto locationDto) {
        return locationService.AddLocation(locationDto);
    }

    @GetMapping("/get/{userId}")
    public Location getLocation(@PathVariable String userId) {
        return locationService.findLocationByUserId(userId);
    }
}
