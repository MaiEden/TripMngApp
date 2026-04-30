package com.hadasim.controllers;

import com.hadasim.dtos.LoginDto;
import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.services.TeacherService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/teacher")
@AllArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;

    @PostMapping("/register")
    public Teacher getTeacher(@RequestBody Teacher teacher) {
        return teacherService.AddTeacher(teacher);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        return teacherService.loginTeacher(loginDto);
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
