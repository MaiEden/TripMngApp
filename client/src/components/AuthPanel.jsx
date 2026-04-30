import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Alert, Stack } from "@mui/material";

import {
  getTeacherById,
  registerTeacher,
  loginTeacher,
} from "../services/teacherService";

function AuthPanel({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState("login");

  const [userIdInput, setUserIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [userLastNameInput, setUserLastNameInput] = useState("");
  const [userGradeInput, setUserGradeInput] = useState("");

  const [authError, setAuthError] = useState("");

  const handleRegister = async () => {
    if (
      userIdInput.trim() === "" ||
      passwordInput.trim() === "" ||
      userGradeInput.trim() === ""
    ) {
      setAuthError("User ID, password and grade are required");
      return;
    }

    try {
      const teacher = await getTeacherById(userIdInput);

      if (teacher.data) {
        setAuthError("Teacher already exists with this ID. Try login.");
        return;
      }

      const newTeacher = {
        id: userIdInput,
        password: passwordInput,
        firstName: userNameInput,
        lastName: userLastNameInput,
        grade: userGradeInput,
      };

      const response = await registerTeacher(newTeacher);

      if (response.status === 200) {
        onLoginSuccess(userIdInput);
      } else {
        setAuthError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setAuthError("An error occurred during registration. Please try again.");
    }
  };

  const handleLogin = async () => {
    const loginTryInfo = {
      id: userIdInput,
      password: passwordInput,
    };

    try {
      const response = await loginTeacher(loginTryInfo);

      if (response.status === 200) {
        onLoginSuccess(userIdInput);
      } else {
        setAuthError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error(error);
      setAuthError("An error occurred during login. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420}}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4" align="center" fontWeight="bold">
              {authMode === "login" ? "Login" : "Register"}
            </Typography>

            <TextField
              label="User ID"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
              fullWidth
            />

            {authMode === "register" && (
              <>
                <TextField
                  label="First name"
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Last name"
                  value={userLastNameInput}
                  onChange={(e) => setUserLastNameInput(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Grade"
                  value={userGradeInput}
                  onChange={(e) => setUserGradeInput(e.target.value)}
                  fullWidth
                />
              </>
            )}

            <TextField
              label="Password"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              fullWidth
            />

            {authError && <Alert severity="error">{authError}</Alert>}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={authMode === "login" ? handleLogin : handleRegister}
            >
              {authMode === "login" ? "Login" : "Register"}
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={() => {
                setAuthMode((prev) =>
                  prev === "login" ? "register" : "login"
                );
                setAuthError("");
              }}
            >
              {authMode === "login"
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AuthPanel;