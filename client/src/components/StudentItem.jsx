import { ListItem, ListItemText } from "@mui/material"

export default function StudentItem({ student }) {
  return (
    <ListItem divider>
      <ListItemText
        primary={`${student.firstName} ${student.lastName}`}
      />
    </ListItem>
  )
}