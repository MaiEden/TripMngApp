package com.hadasim.services;

import com.hadasim.dtos.LocationDto;
import com.hadasim.entities.Location;
import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.entities.User;
import com.hadasim.repositories.LocationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LocationService {
    private static final int MAX_DISTANCE = 3;
    private LocationRepository locationRepository;
    private final StudentService studentService;
    private final TeacherService teacherService;
    private final SimpMessagingTemplate messagingTemplate;

    public Location addLocation(LocationDto locationDto) {
        User student = studentService.findStudentById(locationDto.getID());
        User teacher = teacherService.findTeacherById(locationDto.getID());
        User user = student==null ? teacher : student;

        // if the user not found
        if (user == null) {
            throw new EntityNotFoundException("No such user");
        }
        Location location = LocationDto.dtoToLocation(locationDto);

        if(student == null) {
            // if the user is a teacher
            location.setIsTooFar(Boolean.FALSE);
        } else{
            location.setIsTooFar(isTooFar(location, user));
        }

        location.setUser(user);
        user.setLocation(location);
        if (teacher == null) {
            studentService.addStudent((Student) user);
        } else {
            teacherService.updateTeacher((Teacher) user);
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

    private Boolean isTooFar(Location location, User user) {
        Teacher teacher = teacherService.getTeacherByGrade(user.getGrade());
        if (teacher.getLocation() == null)
            return false;
        int distance = calculateDistanceInKilometer(
                teacher.getLocation().getLatitude(),
                teacher.getLocation().getLongitude(),
                location.getLatitude(),
                location.getLongitude());
        return distance > MAX_DISTANCE;
    }

    // helper function for students distance from teacher
    private final static double AVERAGE_RADIUS_OF_EARTH_KM = 6371;
    private int calculateDistanceInKilometer(double teacherLat, double teacherLng,
                                            double studentLat, double studentLng) {

        double latDistance = Math.toRadians(teacherLat - studentLat);
        double lngDistance = Math.toRadians(teacherLng - studentLng);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(teacherLat)) * Math.cos(Math.toRadians(studentLat))
                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (int) (Math.round(AVERAGE_RADIUS_OF_EARTH_KM * c));
    }

}