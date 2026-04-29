package com.hadasim.entities;
import jakarta.persistence.*;
import java.time.Instant;
import lombok.*;

@Entity
@Table(name = "locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    @Id
    private String id; // 9 digits

    private Double longitude;

    private Double latitude;

    private Instant time;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;
}