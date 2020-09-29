import Grade from "./../src/Grade";
import Student from "./../src/Student";
import { GradeSchool } from "../src/GradeSchool";

describe("School", () => {
  let school: GradeSchool;

  beforeEach(() => {
    school = new GradeSchool();
  });

  // List roster (empty)
  xtest("A new school has an empty roster", () => {
    expect(school.roster()).toEqual({});
  });

  // Add student
  // 1- With requirements
  //    A) MinimumAge
  xtest("adding a student adds them to the roster for the given grade (minimum age required)", () => {
    const expectedResponse = { 1: ["Milan"] };
    const sampleStudent = new Student("Milan", 1997);
    const sampleGrade = new Grade({
      gradeId: 1,
      gradeName: "Clownology",
      requirements: [
        {
          minimumAge: 18,
        },
      ],
    });

    school.enrollStudent(sampleStudent, sampleGrade);
    expect(school.roster()).toEqual(expectedResponse);
  });

  //    B) Required completed grades
  xtest("adding a student adds them to the roster for the given grade (coursed grades required)", () => {
    const expectedResponse = { 1: ["Julia"] };
    const sampleStudent = new Student("Julia", 1995);
    const sampleCoursedGrade = new Grade({
      gradeId: 3,
      gradeName: "Bowling Industry Management",
      requirements: [],
    });

    const sampleGrade = new Grade({
      gradeId: 1,
      gradeName: "Bagpiping",
      requirements: [
        {
          requiredGrades: [3],
        },
      ],
    });

    school.enrollStudent(sampleStudent, sampleCoursedGrade);
    sampleStudent.completeGrade();

    school.enrollStudent(sampleStudent, sampleGrade);
    expect(school.roster()).toEqual(expectedResponse);
  });
});
