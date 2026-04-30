import TeacherCard from "./TeacherCard";
import StudentsList from "./StudentsList";
import { useState } from "react";
import AddStudent from "./AddStudent";
import { Box, Button, Stack } from "@mui/material";

export default function SideBar({ teacher, students, handleLogout, refreshStudents }) {
    // state to control the visibility of the add student form
    const [addStudent, setAddStudent] = useState(false);

    return (
        <Box sx={{ height: "100%", p: 2, bgcolor: "background.paper" }}>
            <Stack spacing={2}>

                <TeacherCard teacher={teacher} />
                <StudentsList students={students} />

                <Button onClick={handleLogout}>Logout</Button>

                {addStudent && (
                    <AddStudent onFinished={() => { refreshStudents(teacher.id); setAddStudent(false) }} teacherGrade={teacher.grade} />
                )}

                {!addStudent &&
                    (<Button variant="outlined" onClick={() => setAddStudent(true)}>
                        Add student
                    </Button>)}
            </Stack>
        </Box>
    );
}