package com.hadasim.repositories;

import com.hadasim.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TeacherRepository
        extends JpaRepository<Teacher,String> {
}
