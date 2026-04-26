import StudentItem from "./StudentItem.jsx";
import { Box } from "@mui/material"

export default function StudentsList({ students }) {
    console.log(students);
  return (
    <Box sx={{ overflowY: "auto", maxHeight: "65vh" }}>
      {students.map((student) => (
        <StudentItem key={student.Id} student={student} />
      ))}
    </Box>
  )
}