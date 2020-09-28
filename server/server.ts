import express from "express";
import { students } from "./students";
import { grades } from "./grades";
import cors from "cors";
import shuffle from "src/utils/shuffle";
const app = express();

app.use(cors());

// return a random set of 10 students for the game
app.get("/students", (_req, res) => {
  const selectedStudents = shuffle(students).slice(0, 10);

  // simulate a slow database call using setTimeout
  setTimeout(() => {
    res.json(selectedStudents);
  }, 1000);
});

// get the starting positions for all students
app.get("/grades", (_req, res) => {
  const selectedGrades = shuffle(grades).slice(0, 10);
  // simulate a slow database call using setTimeout
  setTimeout(() => {
    res.json(selectedGrades);
  }, 1000);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
