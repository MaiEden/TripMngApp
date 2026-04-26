import { Box } from "@mui/material"
import MapArea from "./MapArea";
import SideBar from "./SideBar";

export default function Layout({teacher, students}) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>

        <Box sx={{ flex: 1 }}>
        <MapArea />
      </Box>
      <Box sx={{ width: "25%", minWidth: 280 }}>
        <SideBar teacher={teacher} students={students} />
      </Box>
    </Box>
  )
}