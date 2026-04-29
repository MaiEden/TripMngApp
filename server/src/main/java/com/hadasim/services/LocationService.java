package com.hadasim.services;

import com.hadasim.dtos.LocationDto;
import com.hadasim.entities.Location;
import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.entities.User;
import com.hadasim.repositories.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LocationService {
    private LocationRepository locationRepository;
    private final StudentService studentService;
    private final TeacherService teacherService;
    private final SimpMessagingTemplate messagingTemplate;

    public Location AddLocation(LocationDto locationDto) {
        User student = studentService.findStudentById(locationDto.getID());
        User teacher = teacherService.findTeacherById(locationDto.getID());
        User user = student==null ? teacher : student;

        if (user == null) {
            return null;
        }
        Location location = LocationDto.dtoToLocation(locationDto);

        location.setUser(user);
        user.setLocation(location);
        if (teacher == null) {
            studentService.AddStudent((Student) user);
        } else {
            teacherService.AddTeacher((Teacher) user);
        }

        messagingTemplate.convertAndSend(
                "/topic/locations/"+locationDto.getID(),
                location
        );
        return location;
    }

    public Location findLocationByUserId(String userId) {
        return locationRepository.findByUserId(userId);
    }

    private static double dmsToDecimal(int degrees, int minutes, double seconds) {
        double sign = (degrees < 0) ? -1 : 1;
        double decimal = Math.abs(degrees)
                + (minutes / 60.0)
                + (seconds / 3600.0);
        decimal *= sign;
        return decimal;
    }}