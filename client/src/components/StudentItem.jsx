import { ListItem, ListItemText } from "@mui/material"

export default function StudentItem({ student }) {
  return (
    <ListItem divider sx={{ backgroundColor: student.isTooFar ? "#ffebee" : "inherit" }}>
      <ListItemText 
        primary={`${student.firstName} ${student.lastName}`}
      />
    </ListItem>
  )
}