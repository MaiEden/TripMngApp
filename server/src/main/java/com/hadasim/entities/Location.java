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

    //    @Column(name = "longitude_degrees")
    private String longitudeDegrees;
    //    @Column(name = "longitude_minutes")
    private String longitudeMinutes;
    //    @Column(name = "longitude_seconds")
    private String longitudeSeconds;
    //    @Column(name = "latitude_degrees")
    private String latitudeDegrees;
    //    @Column(name = "latitude_minutes")
    private String latitudeMinutes;
    //    @Column(name = "latitude_seconds")
    private String latitudeSeconds;

    private Instant time;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;
}