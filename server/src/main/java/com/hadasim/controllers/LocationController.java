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
    private final StudentService studentService;
    private final TeacherService teacherService;

    @PostMapping("/Add")
    public Location AddLocation(@RequestBody LocationDto locationDto) {
        User student = studentService.findStudentById(locationDto.getID());
        User teacher = teacherService.findTeacherById(locationDto.getID());
        User user = student==null ? teacher : student;

        if (user == null) {
            return null;
        }

        Location location = user.getLocation();

        if (location == null) {
            location = new Location();
        }

        location.setId(locationDto.getID());
        location.setUser(user);
        user.setLocation(location);

        LocationDto.Dms longitudeDto = locationDto.getCoordinates().getLongitude();
        location.setLongitudeDegrees(longitudeDto.getDegrees());
        location.setLongitudeSeconds(longitudeDto.getSeconds());
        location.setLongitudeMinutes(longitudeDto.getMinutes());

        LocationDto.Dms latitudeDto = locationDto.getCoordinates().getLatitude();
        location.setLatitudeDegrees(latitudeDto.getDegrees());
        location.setLatitudeSeconds(latitudeDto.getSeconds());
        location.setLatitudeMinutes(latitudeDto.getMinutes());

        location.setTime(locationDto.getTime());

        if (teacher == null) {
            studentService.AddStudent((Student) user);
        } else {
            teacherService.AddTeacher((Teacher) user);
        }
        return location;
    }

    @GetMapping("/get/{userId}")
    public Location getLocation(@PathVariable String userId) {
        return locationService.findLocationByUserId(userId);
    }
}
