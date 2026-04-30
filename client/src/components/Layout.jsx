import { Box } from "@mui/material"
import MapArea from "./MapArea";
import SideBar from "./SideBar";
import useLocationUpdates from "../hooks/useLocationUpdates";

export default function Layout({teacher, students,handleLogout, refreshStudents}) {
  const locations = useLocationUpdates({ students, teacher });
    const studentsWithLocation = students.map(student => ({
    ...student,
    isTooFar: locations[student.id]?.isTooFar ?? false,
  }));

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>

        <Box sx={{ flex: 1 }}>
        <MapArea students={students} teacher={teacher} locations={locations} refreshStudents={refreshStudents} />
      </Box>
      <Box sx={{ width: "25%", minWidth: 280 }}>
        <SideBar teacher={teacher} students={studentsWithLocation} handleLogout={handleLogout} refreshStudents={refreshStudents} />
      </Box>
    </Box>
  )
}