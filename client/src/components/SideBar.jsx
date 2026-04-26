import TeacherCard from "./TeacherCard";
import StudentsList from "./StudentsList";

export default function SideBar({teacher, students}) {
    return (
        <div>
            <h1>SideBar</h1>
            <TeacherCard teacher={teacher} />
            <StudentsList students={students} />
        </div>
    );
}