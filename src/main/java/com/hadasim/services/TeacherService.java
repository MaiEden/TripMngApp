package com.hadasim.services;

import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.repositories.StudentRepository;
import com.hadasim.repositories.TeacherRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class TeacherService {

    private final StudentRepository studentRepository;
    private TeacherRepository teacherRepository;

    public Teacher AddTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public Teacher findTeacherById(String teacherId) {
        return teacherRepository.findById(teacherId).orElse(null);
    }

    public List<Student> findStudents(String teacherId) {
        Teacher teacher = findTeacherById(teacherId);
        return studentRepository.findAllByGrade(teacher.getGrade());
    }

}
