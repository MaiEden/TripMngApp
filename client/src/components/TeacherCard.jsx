import { Card, CardContent, Typography } from "@mui/material"

export default function TeacherCard({ teacher }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {teacher.firstName} {teacher.lastName}
        </Typography>
        <Typography color="text.secondary">
          כיתה: {teacher.grade}
        </Typography>
      </CardContent>
    </Card>
  )
}