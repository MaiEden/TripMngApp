package com.hadasim.services;

import com.hadasim.dtos.LoginDto;
import com.hadasim.entities.Student;
import com.hadasim.entities.Teacher;
import com.hadasim.repositories.StudentRepository;
import com.hadasim.repositories.TeacherRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MissingRequestValueException;

import java.security.InvalidParameterException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;

@Service
@AllArgsConstructor
public class TeacherService {
    private final StudentRepository studentRepository;
    private TeacherRepository teacherRepository;

    public Teacher addTeacher(Teacher teacher) {
        Teacher existTeacher = teacherRepository.findById(teacher.getId()).orElse(null);
        if (existTeacher != null) {
            throw new InvalidParameterException("Teacher already exist");
        }
        existTeacher = teacherRepository.findByGrade(teacher.getGrade());
        if (existTeacher != null) {
            throw new InvalidParameterException("Teacher of tha grade already exist");
        }

        teacher.setPassword(hashPassword(teacher.getPassword()));
        return teacherRepository.save(teacher);
    }

    public void updateTeacher(Teacher teacher) {
        teacherRepository.save(teacher);
    }

    public Teacher findTeacherById(String teacherId) {
        return teacherRepository.findById(teacherId).orElse(null);
    }

    public List<Student> findStudents(String teacherId) {
        Teacher teacher = findTeacherById(teacherId);
        if (teacher == null) {
            throw new EntityNotFoundException("Teacher not found");
        }
        return studentRepository.findAllByGrade(teacher.getGrade());
    }

    public void loginTeacher(LoginDto loginDto) {
        Teacher existTeacher = findTeacherById(loginDto.getId());

        if (existTeacher == null) {
            throw new EntityNotFoundException("Teacher not found");
        }

        boolean loginSuccess = existTeacher.getPassword().equals(hashPassword(loginDto.getPassword()));
        if (!loginSuccess) {
            throw new InvalidParameterException("Passwords do not match");
        }
    }

    public Teacher getTeacherByGrade(String teacherGrade) {
        return teacherRepository.findByGrade(teacherGrade);
    }

    // helper function
    static private String hashPassword(String password){

        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        return HexFormat.of().formatHex(
                md.digest(password.getBytes()));
    }
}
