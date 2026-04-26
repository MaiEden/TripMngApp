package com.hadasim.services;

import com.hadasim.entities.Student;
import com.hadasim.repositories.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository studentRepository;

    public Student AddStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student findStudentById(String id) {
        return studentRepository.findById(id).orElse(null);
    }
}