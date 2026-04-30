import StudentItem from "./StudentItem.jsx";
import { Box } from "@mui/material"

export default function StudentsList({ students }) {
  return (
    <Box sx={{ overflowY: "auto", maxHeight: "65vh" }}>
      {students.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))}
    </Box>
  )
}