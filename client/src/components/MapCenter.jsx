import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.setView([position.lat, position.lng], map.getZoom(), {
      animate: true,
    });
  }, [position, map]);

  return null;
}