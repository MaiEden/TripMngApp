import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import AuthPanel from './components/AuthPanel';
import { getStudents, getTeacherById } from './services/teacherService.js';

function App() {
    const [currentTeacher, setCurrentTeacher] = useState();
    const [students, setStudents] = useState([]);

    const refreshStudents = (teacherid) => {
        getStudents(teacherid).then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        })
    };

    const handleLoginSuccess = (teacherid) => {
        getTeacherById(teacherid).then((response) => {
            const teacher = response.data;
            setCurrentTeacher(teacher);
        });
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

// import Layout from './components/Layout.jsx';
// import { useEffect, useState } from 'react';
// import { getTeacherById, getStudents } from './services/teacherService.js';

// function App() {

//    const [teacher, setTeacher] = useState({})

//     useEffect(() => {
//         getTeacherById(214332552).then((response) => {
//             setTeacher(response.data);
//         }).catch(error => {
//             console.error(error);
//         })
//     }, [])

//    const [students, setStudents] = useState([])

//     useEffect(() => {
//         getStudents(214332552).then((response) => {
//             setStudents(response.data);
//         }).catch(error => {
//             console.error(error);
//         })
//     }, [])

//   return <Layout teacher={teacher} students={students} />
// }

// export default App