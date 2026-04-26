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

  // const teacher = {
  //   firstName: "שרה",
  //   lastName: "כהן",
  //   grade: "ו2"
  // }

   const [students, setStudents] = useState([])

    useEffect(() => {
        getStudents(214332552).then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])
  // [
  //   { id: 1, firstName: "רחל", lastName: "לוי" },
  //   { id: 2, firstName: "מיכל", lastName: "ישראלי" },
  //   { id: 3, firstName: "תמר", lastName: "אברהם" }
  // ]

  return <Layout teacher={teacher} students={students} />
}


export default App