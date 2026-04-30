package com.hadasim.services;

import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.repositories.StudentRepository;
import com.hadasim.repositories.TeacherRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentService {

    private final TeacherRepository teacherRepository;
    private StudentRepository studentRepository;

    public Student AddStudent(Student student) {
        Teacher teacher = teacherRepository.findByGrade(student.getGrade());
        if (teacher == null) {
            throw new IllegalArgumentException("No teacher found for grade: " + student.getGrade());
        }
        return studentRepository.save(student);
    }

    public Student findStudentById(String id) {
        return studentRepository.findById(id).orElse(null);
    }
}