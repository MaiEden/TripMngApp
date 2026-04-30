package com.hadasim.controllers;

import com.hadasim.dtos.LoginDto;
import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.services.TeacherService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/teachers")
@AllArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;

    @PostMapping("/register")
    public Teacher registerTeacher(@RequestBody @Valid Teacher teacher) {
        return teacherService.addTeacher(teacher);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginDto loginDto) {
        try {
            teacherService.loginTeacher(loginDto);
        }
        catch (EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
        catch (InvalidParameterException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Login Successful");
    }

    @GetMapping("/get/{id}")
    public Teacher getTeacher(@PathVariable String id) {
        return teacherService.findTeacherById(id);
    }

    @GetMapping("/getStudents/{id}")
    public List<Student> getStudentsPerTeacher(@PathVariable String id) {
        return teacherService.findStudents(id);
    }
}
