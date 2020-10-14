import Grade, { GradeInfo } from "./Grade";
import Student, { StudentProps } from "./Student";

export class GradeSchool {
  private readonly grades: Grade[] = [];

  public addGrade(grade: Grade) {
    this.grades.push(grade);
  }

  // Graduates student from an especific degree
  public graduateStudent(student: Student): void {
    const { currentlyCoursing } = student.getProps();

    if (currentlyCoursing) {
      this.delistStudent(student);
      student.completeGrade();
    }
    currentlyCoursing && this.delistStudent(student);
  }

  // Evaluates if a student is able to enroll a grade depending on the requirements.
  public studentIsValid(student: Student, grade: Grade): boolean {
    const { requirements }: GradeInfo = grade.getGradeInfo();
    const { coursedDegrees }: StudentProps = student.getProps();
    let verdict = true;

    requirements.forEach(({minimumAge, requiredGrades}) => {
      if (minimumAge && student.getAge() < minimumAge) {
        verdict = false;
      }

      if (requiredGrades) {
        let hasRequiredGrades = !requiredGrades?.every((requiredGrade) => {
          coursedDegrees.includes(requiredGrade);
        });

        if (!hasRequiredGrades) verdict = false;
      }
    });

    return verdict;
  }

  // Add student to grade
  public enrollStudent(student: Student, grade: Grade): void {

    if (this.studentIsValid(student, grade)) {
      grade.addStudent(student);
      student.setCurrentDegree(grade);
    }
  }

  // Remove student
  public delistStudent(student: Student): void {
    console.log(student, student.getProps());
    let currentlyCoursing = student.getProps().currentlyCoursing;

    if (currentlyCoursing) {
      let indexToDelist = currentlyCoursing
        .getEnrolledStudents()
        .indexOf(student, 0);

      if (indexToDelist > -1) {
        currentlyCoursing.getEnrolledStudents().splice(indexToDelist, 1);
      }
    }
  }

  public roster() {
    let roster = {};
    if (this.grades) {

      this.grades.forEach((grade) => {
        let gradeStudents = grade.listStudents();
        let gradeId = grade.getGradeInfo().gradeId;

        roster = {
          ...roster,
          [gradeId]: gradeStudents,
        };
      });
    }
    return roster;
  }
}
