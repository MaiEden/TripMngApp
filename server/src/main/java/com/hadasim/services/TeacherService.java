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

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;

@Service
@AllArgsConstructor
public class TeacherService {

    private final StudentRepository studentRepository;
    private TeacherRepository teacherRepository;


    public Teacher AddTeacher(Teacher teacher) {
        if(teacher.getId() == null|| teacher.getPassword() == null) {
            throw new RuntimeException("Missing username or password");
        }
        teacher.setPassword(hashPassword(teacher.getPassword()));
        return teacherRepository.save(teacher);
    }

    public Teacher UpdateTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
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

    public ResponseEntity<String> loginTeacher(LoginDto loginDto) {

        if(loginDto.getId() == null|| loginDto.getPassword() == null) {
            return ResponseEntity.badRequest().body("Missing username or password");
        }

        Teacher existTeacher = findTeacherById(loginDto.getId());

        if (existTeacher == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }
        String password = existTeacher.getPassword();
        String hashedPassword = hashPassword(password);
        boolean loginSuccess = existTeacher.getPassword().equals(hashPassword(loginDto.getPassword()));
        if (loginSuccess) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid password");
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
