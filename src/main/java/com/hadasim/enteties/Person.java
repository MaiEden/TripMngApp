package com.hadasim.enteties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "person")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Person {
    @Id
    private Integer PersonId;
    private String firstName;
    private String lastName;
    private String grade;
    private boolean teacher;
}