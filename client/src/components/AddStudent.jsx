import { useState } from "react";
import { addStudent } from "../services/studentService";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function AddStudent({ onFinished, teacherGrade }) {
    const [idInput, setIDInput] = useState("");
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [error, setError] = useState("");

    const handleAddStudent = (e) => {
        e.preventDefault();
        const newStudent = {
            id: idInput,
            firstName: firstNameInput,
            lastName: lastNameInput,
            grade: teacherGrade
        };
        addStudent(newStudent).then((response) => {
            console.log("Student added successfully");
            onFinished(); // call the onFinished callback to refresh the students list and hide the form
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
                    value={idInput}
                    onChange={(e) => setIDInput(e.target.value)}
                />

                <TextField
                    label="First name"
                    value={firstNameInput}
                    onChange={(e) => setFirstNameInput(e.target.value)}
                />

                <TextField
                    label="Last name"
                    value={lastNameInput}
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