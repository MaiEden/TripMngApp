const BASIC_URL = "http://localhost:8080";

export async function getStudents(teacherId) {
  const response = await fetch(`${BASIC_URL}/teacher/getStudents/${teacherId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}