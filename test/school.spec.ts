import Grade from "./../src/Grade";
import Student from "./../src/Student";
import { GradeSchool } from "../src/GradeSchool";

describe("School", () => {
  let school: GradeSchool;

  beforeEach(() => {
    school = new GradeSchool();
  });

  // List roster (empty)
  test("A new school has an empty roster", () => {
    expect(school.roster()).toEqual({});
  });

  // Add student
  // 1- With requirements
  //    A) MinimumAge
  test("adding a student adds them to the roster for the given grade (minimum age required)", () => {
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

    school.addGrade(sampleGrade);
    school.enrollStudent(sampleStudent, sampleGrade);
    expect(school.roster()).toEqual(expectedResponse);
  });

  //    B) Required completed grades
  test("adding a student adds them to the roster for the given grade (coursed grades required)", () => {
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

    school.addGrade(sampleGrade);
    school.enrollStudent(sampleStudent, sampleCoursedGrade);
    sampleStudent.completeGrade();

    school.enrollStudent(sampleStudent, sampleGrade);
    expect(school.roster()).toEqual(expectedResponse);
  });

  // Sort students by grade
  test("adding more students to the same grade adds them to the roster (alphabetically ordered)", () => {
    const sampleGrade = new Grade({
      gradeId: 2,
      gradeName: "Bagpiping",
      requirements: [
        {
          minimumAge: 17,
        },
      ],
    });

    const sampleStudents = [
      new Student("Daan", 1995),
      new Student("Tesa", 1998),
      new Student("Julia", 2001),
    ];

    school.addGrade(sampleGrade);
    sampleStudents.map((sampleStudent) => {
      school.enrollStudent(sampleStudent, sampleGrade);
    });

    const expectedDb = { 2: ["Daan", "Julia", "Tesa"] };
    expect(school.roster()).toEqual(expectedDb);
  });

  // Remove student from grade (quit)
  test("removing student from grade removes him/her from the roster", () => {
    const expectedDb = { 4: [] };
    const sampleStudent = new Student("Lucas", 1992);
    const sampleGrade = new Grade({
      gradeId: 4,
      gradeName: "Cannabis Cultivation",
      requirements: [
        {
          minimumAge: 19,
        },
      ],
    });

    school.addGrade(sampleGrade);
    school.enrollStudent(sampleStudent, sampleGrade);
    school.delistStudent(sampleStudent);

    expect(school.roster()).toEqual(expectedDb);
  });
});
