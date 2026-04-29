import { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

export default function useLocationUpdates({ students = [], teacher }) {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    if (!teacher?.id && students.length === 0) return;

    const client = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/LocationUpdates"),

      onConnect: () => {
        const subscribeToUser = (userId) => {
          client.subscribe(`/topic/locations/${userId}`, (message) => {
            const data = JSON.parse(message.body);

            setLocations((prev) => ({
              ...prev,
              [data.id]: {
                lat: data.latitude,
                lng: data.longitude,
                time: data.time,
              },
            }));
          });
        };

        if (teacher?.id) subscribeToUser(teacher.id);

        students.forEach((student) => {
          subscribeToUser(student.id);
        });
      },

      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [teacher?.id, students]);

  return locations;
}
