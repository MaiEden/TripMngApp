import { useState } from 'react';
import Layout from './components/Layout.jsx';
import AuthPanel from './components/AuthPanel';
import { getStudents, getTeacherById } from './services/teacherService.js';

function App() {
    // current teacher loged in
    const [currentTeacher, setCurrentTeacher] = useState();
    // students of the current teacher
    const [students, setStudents] = useState([]);

    // refresh students list after login or after adding a new student
    const refreshStudents = (teacherid) => {
        getStudents(teacherid).then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        })
    };

    // after successful login, get teacher details and students list
    const handleLoginSuccess = async(teacherid) => {
        const teacherResponse = await getTeacherById(teacherid);
        const teacher = teacherResponse.data;
        setCurrentTeacher(teacher);
        refreshStudents(teacherid);
    };

    const handleLogout = () => {
        setCurrentTeacher(null);
    };

    return (
        <div>
            {currentTeacher ? (
                <Layout teacher={currentTeacher} students={students} handleLogout={handleLogout} refreshStudents={refreshStudents} />
            ) : (
                <AuthPanel onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;