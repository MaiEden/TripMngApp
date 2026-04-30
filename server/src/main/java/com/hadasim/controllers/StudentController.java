package com.hadasim.controllers;

import com.hadasim.entities.Student;
import com.hadasim.services.StudentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping("/Add")
    public Student getStudent(@RequestBody @Valid Student student) {
        return studentService.AddStudent(student);
    }

    @GetMapping("/get/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.findStudentById(id);
    }
}
