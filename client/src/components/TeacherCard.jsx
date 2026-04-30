import { Box, CardContent, Typography } from "@mui/material"

export default function TeacherCard({ teacher }) {
  return (
    <Box>
      <CardContent>
        <Typography variant="h3">
          {teacher.firstName} {teacher.lastName}
        </Typography>
        <Typography color="text.secondary" variant="h6">
          Grade: {teacher.grade}
        </Typography>
      </CardContent>
    </Box>
  )
}