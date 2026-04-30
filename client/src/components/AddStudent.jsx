import { useState } from "react";
import { addStudent } from "../services/studentService";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function AddStudent({ onFinished, teacherGrade }) {
    const [IDInput, setIDInput] = useState("");
    const [FirstNameInput, setFirstNameInput] = useState("");
    const [LastNameInput, setLastNameInput] = useState("");
    const [error, setError] = useState("");

    const handleAddStudent = (e) => {
        e.preventDefault();
        const newStudent = {
            id: IDInput,
            firstName: FirstNameInput,
            lastName: LastNameInput,
            grade: teacherGrade
        };
        addStudent(newStudent).then((response) => {
            if (response.status === 200) {
                // Student added successfully, you can perform any additional actions here
                console.log("Student added successfully");
                onFinished(); // Pass the new student data back to the parent component
            } else {
                console.error("Failed to add student. Please try again.");
                setError("Failed to add student. Please try again.");
            }
        }).catch((error) => {
            console.error("An error occurred while adding the student:", error);
            setError("Failed to add student. Please try again.");
        });
    }

    return (
        <Box >
            <Stack
                component="form"
                spacing={2}
                onSubmit={handleAddStudent}
            >
                <Typography variant="h6" fontWeight="bold">
                    Add Student
                </Typography>

                <TextField
                    label="ID"
                    value={IDInput}
                    onChange={(e) => setIDInput(e.target.value)}
                />

                <TextField
                    label="First name"
                    value={FirstNameInput}
                    onChange={(e) => setFirstNameInput(e.target.value)}
                />

                <TextField
                    label="Last name"
                    value={LastNameInput}
                    onChange={(e) => setLastNameInput(e.target.value)}
                />
                {error && (
                    <Typography color="error">
                        {error}
                    </Typography>
                )}

                <Button type="submit">
                    Add Student
                </Button>
            </Stack>
        </Box>
    );
}   