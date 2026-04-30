/*
this hook is for getting updates from the server about locations of the students and the teacher.
*/
import { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

export default function useLocationUpdates({ students = [], teacher }) {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    if (!teacher?.id && students.length === 0) return;

    const client = new Client({
      // the URL of the WebSocket endpoint on the server
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/LocationUpdates"),

      onConnect: () => {
        //when connected, subscribe to the location updates for users
        const subscribeToUser = (userId) => {
          client.subscribe(`/topic/locations/${userId}`, (message) => {
            const data = JSON.parse(message.body);

            // update the location for the user in the state
            setLocations((prev) => ({
              ...prev,
              [data.id]: {
                lat: data.latitude,
                lng: data.longitude,
                time: data.time,
                isTooFar: data.isTooFar
              },
            }));
          });
        };

        // subscribe to the teacher's and students location updates
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
