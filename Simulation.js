/*
This script simulates the movement of a teacher and students along a predefined route.
 It sends location updates to the server every 2 seconds, with the teacher following the route exactly
  and the students moving randomly around the route points.
  */
const SERVER_URL = "http://localhost:8080";

const teacher = {
    id: "214332552",
    firstName: "Lea",
    lastName: "Levy",
    grade: "6,2",
    password: "password123"
};

let teacher_step = { step: 0, inc: true }

const students = [
    {
        id: "234342526",
        firstName: "Mai",
        lastName: "Eden",
        grade: "6,2"
    },
    {
        id: "234342527",
        firstName: "Noa",
        lastName: "Cohen",
        grade: "6,2"
    },
    {
        id: "234342528",
        firstName: "Eli",
        lastName: "Levi",
        grade: "6,2"
    }]

const students_steps = [{ step: 0, inc: true }, { step: 0, inc: true }, { step: 0, inc: true }];

// The predefined route.
const route = [
    { lat: 31.776227, lng: 34.834093 },
    { lat: 31.775365, lng: 34.835934 },
    { lat: 31.774344, lng: 34.836655 },
    { lat: 31.773301, lng: 34.837242 },
    { lat: 31.771940, lng: 34.837455 },
    { lat: 31.770829, lng: 34.838736 },
    { lat: 31.769241, lng: 34.840657 },
    { lat: 31.769855, lng: 34.843288 },
    { lat: 31.770302, lng: 34.845409 },
    { lat: 31.769963, lng: 34.847964 },
    { lat: 31.768930, lng: 34.848780 },
    { lat: 31.767713, lng: 34.849142 },
    { lat: 31.766480, lng: 34.849577 },
    { lat: 31.765355, lng: 34.849668 },
    { lat: 31.764184, lng: 34.850121 },
    { lat: 31.763291, lng: 34.850429 },
    { lat: 31.762458, lng: 34.850592 }
]

// adding teacher and student data to the server
try {
    const response = await fetch(`${SERVER_URL}/teachers/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teacher)
    });

    console.log("Sent teacher data:", teacher, "status:", response.status);
} catch (error) {
    console.error("Error sending teacher data:", error);
}

try {
    for (const student of students) {
        const response = await fetch(`${SERVER_URL}/students/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        console.log("Sent student data:", student, "status:", response.status);
    }
} catch (error) {
    console.error("Error sending student data:", error);
}

// Convert decimal coordinates to DMS format for the server format.
function decimalToDMSObject(lat, lng) {
    function convert(value) {
        const abs = Math.abs(value);

        const degrees = Math.floor(abs);
        const minutesFloat = (abs - degrees) * 60;
        const minutes = Math.floor(minutesFloat);
        const seconds = Math.round((minutesFloat - minutes) * 60);

        return {
            Degrees: String(degrees),
            Minutes: String(minutes),
            Seconds: String(seconds)
        };
    }

    return {
        Coordinates: {
            Longitude: convert(lng),
            Latitude: convert(lat)
        }
    };
}

//slightly moving the students around the route points to simulate movement
function randomMovePoint(lat, lng) {
    const maxMeters = 30;
    const metersNorth = (Math.random() * 2 - 1) * maxMeters;
    const metersEast = (Math.random() * 2 - 1) * maxMeters;

    const metersPerDegreeLat = 111_320;
    const metersPerDegreeLng = 111_320 * Math.cos(lat * Math.PI / 180);

    return {
        latitude: +(lat + metersNorth / metersPerDegreeLat).toFixed(6),
        longitude: +(lng + metersEast / metersPerDegreeLng).toFixed(6)
    };
}

// Update the location. The teacher follows the route exactly, while students move randomly around the route points.
async function sendLocation(userId, {lat,lng}, isTeacher) {
    let location;
    if (isTeacher) {
        location = decimalToDMSObject(lat, lng);
    } else {
        const randomPoint = randomMovePoint(lat, lng);
        location = decimalToDMSObject(randomPoint.latitude, randomPoint.longitude);
    }

    try {
        const response = await fetch(`${SERVER_URL}/Locations/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ID: userId,
                ...location,
                Time: new Date().toISOString()
            })
        });

        console.log("Sent location for user:", userId, "status:", response.status);
        console.log(location);
    } catch (error) {
        console.error("Error sending location:", error);
    }
}

// Handle the step increment/decrement for the teacher and students.
function handle_Step(stepInfo) {
    let { step, inc } = stepInfo;
    if (inc) {
        step++;
        if (step >= route.length) {
            step = route.length - 1;
            inc = false;
        }
    } else {
        step--;
        if (step < 0) {
            step = 0;
            inc = true;
        }
    }
    return { step, inc };
}

//adding a far away student to demonstrate the far away student logic
const farStudent =
    {
        id: "234342529",
        firstName: "Avi",
        lastName: "Mizrahi",
        grade: "6,2"
    };

try {
    const response = await fetch(`${SERVER_URL}/students/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(farStudent)
    });

    console.log("Sent farStudent data:", farStudent, "status:", response.status);
} catch (error) {
    console.error("Error sending farStudent data:", error);
}

setInterval(() => {
    teacher_step = handle_Step(teacher_step);
    sendLocation(teacher.id, route[teacher_step.step], true);
    let student = Math.floor(Math.random() * students.length)
    const randomUser = students[student];
    students_steps[student] = handle_Step(students_steps[student]);
    sendLocation(randomUser.id, route[students_steps[student].step], false);
    sendLocation(farStudent.id, {lat: 31.787222, lng: 34.886304}, false);
}, 3000);