import Grade, { GradeInfo } from "./Grade";
import Student, { StudentProps } from "./Student";

export class GradeSchool {
  private readonly grades: Grade[];

  public addGrade(grade: Grade) {
    this.grades.push(grade);
  }

  // Graduates student from an specific degree
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
  
    requirements.forEach((requirement) => {
      const passRequirements =
        student.getAge() < requirement.minimumAge! ||
        requirement.requiredGrades!.every((requiredGrade) => {
          coursedDegrees.includes(requiredGrade);
        });

      if (!passRequirements) {
        return false;
      }
    });

    return true;
  }

  // Add student to grade -> maybe merge it within the School
  public enrollStudent(student: Student, grade: Grade): void {
    let { gradeId, gradeName } = grade.getGradeInfo();
    if (this.studentIsValid(student, grade)) {
    } else {
      throw new Error(
        `Student: ${student.getName()} can't be accepted in grade: [${gradeId}] - ${gradeName}
        .`
      );
    }
  }

  // Remove student
  private delistStudent(student: Student): void {
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

    this.grades.forEach((grade) => {
      let gradeStudents = grade.listStudents();
      let gradeId = grade.getGradeInfo().gradeId;

      roster = {
        ...roster,
        [gradeId]: gradeStudents,
      };
    });

    return roster;
  }
}
