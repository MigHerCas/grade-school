import axios from "axios";
import Grade from "./Grade";
import GradeSchool from "./GradeSchool";
import Student from "./Student";

async function fetchDataFromServer() {
  const studentsCall = axios.get<Student[]>("http://localhost:4000/students");
  const gradesCall = axios.get<Grade[]>("http://localhost:4000/grades");

  return Promise.all([studentsCall, gradesCall]).then((response) => {
    return { students: response[0].data, grades: response[1].data };
  });
}

// Only triggered when app is initialized
async function renderToContainer() {
  const root = document.getElementById("root")!;
  const { students, grades } = await fetchDataFromServer();
  root.innerHTML = "";

  const gradeSchool = new GradeSchool(students, grades);

  (window as any).gradeSchool = gradeSchool;

  // gradeSchool.renderWithProps({}); // initial render
}
