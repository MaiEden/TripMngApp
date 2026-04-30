import TeacherCard from "./TeacherCard";
import StudentsList from "./StudentsList";
import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import { getStudents } from "../services/teacherService";
import { Box, Button, Typography, Stack } from "@mui/material";

export default function SideBar({ teacher, students, handleLogout, refreshStudents }) {
    const [addStudent, setAddStudent] = useState(false);
    // const [teacherStudents, setTeacherStudents] = useState([]);

    // useEffect(() => {
    //     setTeacherStudents(students || []);
    // }, [students]);
    // function handleAddStudent() {
    //     setAddStudent(false);
    //     getStudents(teacher.id).then((response) => {
    //         setTeacherStudents(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }
    return (
        <Box sx={{ height: "100%", p: 2, bgcolor: "background.paper" }}>
            <Stack spacing={2}>

                <TeacherCard teacher={teacher} />
                <StudentsList students={students} />

                <Button onClick={handleLogout}>Logout</Button>

                {addStudent && (
                    <AddStudent onFinished={()=>refreshStudents(teacher.id)} teacherGrade={teacher.grade} />
                )}

                <Button variant="outlined" onClick={() => setAddStudent(true)}>
                    add student
                </Button>
            </Stack>
        </Box>
    );
}