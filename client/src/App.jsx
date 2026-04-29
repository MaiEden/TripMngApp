import Layout from './components/Layout.jsx';
import { useEffect, useState } from 'react';
import { getTeacherById, getStudents } from './services/teacherService.js';

function App() {

   const [teacher, setTeacher] = useState({})

    useEffect(() => {
        getTeacherById(214332552).then((response) => {
            setTeacher(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

   const [students, setStudents] = useState([])

    useEffect(() => {
        getStudents(214332552).then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

  return <Layout teacher={teacher} students={students} />
}

export default App