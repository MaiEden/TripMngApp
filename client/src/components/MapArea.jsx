import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import placeholderIcon from "../icons/placeholder.png";
import placeholderDangerIcon from "../icons/placeholder-danger.png";
import MapCenter from "./MapCenter";


const customIcon = new Icon({
  iconUrl: placeholderIcon,
  iconSize: [38, 38],
});

const dangerIcon = new Icon({
  iconUrl: placeholderDangerIcon,
  iconSize: [38, 38]
});

export default function MapArea({ students = [], teacher , locations}) {

  const teacherLocation = teacher?.id ? locations[teacher.id] : null;

  const defaultCenter = teacherLocation
    ? [teacherLocation.lat, teacherLocation.lng]
    : [31.7683, 35.2137];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCenter position={teacherLocation} />
        {teacherLocation && (
          <Marker
            position={[teacherLocation.lat, teacherLocation.lng]}
            icon={customIcon}
          >
            <Popup>
              {teacher.firstName} {teacher.lastName}
              <br />
              מורה
            </Popup>
          </Marker>
        )}
        {students.map((student) => {
          const location = locations[student.id];
          if (!location) return null;

          return (
            <Marker
              key={student.id}
              position={[location.lat, location.lng]}
              icon={location.isTooFar ? dangerIcon : customIcon}
            >
              <Popup>
                {student.firstName} {student.lastName}
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}