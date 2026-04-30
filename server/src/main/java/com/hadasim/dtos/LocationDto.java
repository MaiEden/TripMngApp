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

    //helper functions for saving the locations as decimal representation
    public static Location dtoToLocation(LocationDto locationDto) {
        Location location = new Location();
        location.setId(locationDto.getID());
        LocationDto.Dms longitudeDto = locationDto.getCoordinates().getLongitude();

        location.setLongitude(dmsToDecimal(
                Integer.parseInt(longitudeDto.getDegrees()),
                Integer.parseInt(longitudeDto.getMinutes()),
                Integer.parseInt(longitudeDto.getSeconds())));

        LocationDto.Dms latitudeDto = locationDto.getCoordinates().getLatitude();

        location.setLatitude(dmsToDecimal(
                Integer.parseInt(latitudeDto.getDegrees()),
                Integer.parseInt(latitudeDto.getMinutes()),
                Integer.parseInt(latitudeDto.getSeconds())));

        location.setTime(locationDto.getTime());
        return location;


    }

    public static double dmsToDecimal(int degrees, int minutes, double seconds) {
        double sign = (degrees < 0) ? -1 : 1;
        double decimal = Math.abs(degrees)
                + (minutes / 60.0)
                + (seconds / 3600.0);
        decimal *= sign;
        return decimal;
    }
}