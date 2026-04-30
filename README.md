# Trip Tracking Application
This application is a system for managing and tracking students' locations during trips.

It is designed for teachers and allows them to view students' locations in real time using data received from sensors.

The application displays an interactive map with the students' locations, along with an organized list of all participants. In addition, it allows teachers to register, log in and manage students, including adding students.

The system is built using a client-server architecture:

The server side is developed with Spring Boot, and the client side is built with React using Vite and JavaScript.

## How to Install and Run
### Prerequisites

Before running the project, make sure you have installed:
- [Java 17](https://github.com/noffle/art-of-readme)
- [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- An IDE such as [IntelliJ](https://www.jetbrains.com/idea/download/) IDEA or [VS Code](https://code.visualstudio.com/download)
### 1. Clone the Repository

```shellscript
git clone https://github.com/MaiEden/TripMngApp.git
cd TripMngApp
```

### 2. Run the Database
The project uses PostgreSQL, which runs with Docker Compose.

From the server folder, run:

```shellscript
docker-compose up -d
```

This will start a PostgreSQL database with the configuration defined in [docker-compose.yml](https://github.com/MaiEden/TripMngApp/blob/main/server/docker-compose.yml).
### 3. Run the Server
Open the server project in your IDE and run the file [TripMngAppApplication.java](https://github.com/MaiEden/TripMngApp/blob/main/server/src/main/java/com/hadasim/TripMngAppApplication.java)
The server will run on:

```shellscript
http://localhost:8080
```

### 4. Run the Client

Open a terminal and navigate to the client folder:

```shellscript
cd client
```

Install the dependencies:

```shellscript
npm install
```

Run the client:

```shellscript
npm run dev
```

### 5. Run the Sensor Simulation

To simulate sensor location updates, run the simulation file:

```shellscript
node Simulation.js
```

Make sure the server is running before starting the simulation.

## How to use

**Open the application** in your browser (usually at http://localhost:5173).

**Register as a teacher** by providing your details.
   <img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/8e27e5d2-548f-4ab5-a32e-6b7baab7801f" />
   After this you will enter the map area.
   There, you can add students:
   <img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/a5c05d36-ae90-46f2-9b73-181ca4ea5220" />
   After that you can see the students you added:
   <img width="1918" height="871" alt="image" src="https://github.com/user-attachments/assets/4f4354ab-eae4-4eda-9af1-5d5884ca1964" />
**Note:** Locations won't appear on the screen because there are no real sensors. If you want to see the sensors you should run the [simulation](https://github.com/MaiEden/TripMngApp/blob/main/Simulation.js) file.
    
### How to use with Simulation file
Run the simulation and then log in with teacher id: 214332552, password: password123.
Then the script will send location for all the demo students and for the teacher every 3 seconds:

![app_recor](https://github.com/MaiEden/TripMngApp/blob/main/app_recordings.gif)
