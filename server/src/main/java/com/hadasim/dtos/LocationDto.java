package com.hadasim.dtos;

import com.hadasim.entities.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {
    private String ID;

    private Coordinates Coordinates;

    private Instant Time;

    public static Location dtoToLocation(LocationDto locationDto) {
        Location location = new Location();
        location.setId(locationDto.getID());


        LocationDto.Dms longitudeDto = locationDto.getCoordinates().getLongitude();
        location.setLongitudeDegrees(longitudeDto.getDegrees());
        location.setLongitudeSeconds(longitudeDto.getSeconds());
        location.setLongitudeMinutes(longitudeDto.getMinutes());

        LocationDto.Dms latitudeDto = locationDto.getCoordinates().getLatitude();
        location.setLatitudeDegrees(latitudeDto.getDegrees());
        location.setLatitudeSeconds(latitudeDto.getSeconds());
        location.setLatitudeMinutes(latitudeDto.getMinutes());

        location.setTime(locationDto.getTime());
        return location;


    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Coordinates {

        private Dms Longitude;

        private Dms Latitude;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Dms {
        private String Degrees;

        private String Minutes;

        private String Seconds;
    }
}