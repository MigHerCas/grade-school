import Student, { StudentProps } from "./Student";
import Grade, { GradeInfo, Requirement } from "./Grade";
import { StudentName } from "shared/sharedModels";

interface studentsFromGrade {
  [key: number]: string[];
}

export default class GradeSchool {
  private readonly students: Student[] = [];
  private readonly grades: Grade[] = [];

  constructor() {}

  public getGradeSchoolInfo() {
    return { students: this.students, grades: this.grades };
  }

  private studentIsAccepted(student: Student): boolean {
    return false;
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
  protected studentIsValid(student: Student, grade: Grade): boolean {
    const { requirements }: GradeInfo = grade.getGradeInfo();
    const { coursedDegrees }: StudentProps = student.getProps();

    requirements.forEach(({ minimumAge, requiredGrades }: Requirement) => {
      if (
        student.getAge() < minimumAge! ||
        !requiredGrades!.every((requiredGrade) =>
          coursedDegrees.includes(requiredGrade)
        )
      ) {
        return false;
      }
    });

    return true;
  }

  // Add student to grade -> maybe merge it within the School
  private enrollStudent(student: Student, grade: Grade): void {
    let { gradeId, GradeName } = grade.getGradeInfo();
    if (this.studentIsValid(student, grade)) {
    } else {
      throw new Error(
        `Student: ${student.getName()} can't be accepted in grade: [${gradeId}] - ${GradeName}
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

  public roster(): studentsFromGrade {
    const roster: studentsFromGrade = {};

    this.grades.forEach((grade) => {
      let gradeStudents = grade.listStudents();
      let { gradeId } = grade.getGradeInfo();

      roster[gradeId] = gradeStudents;
    });

    return roster;
  }
}
