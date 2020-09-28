import { StudentName } from "shared/sharedModels";
import Grade from "./Grade";

export interface StudentProps {
  currentlyCoursing: Grade | null;
  coursedDegrees: number[] | [];
}

export default class Student {
  private readonly studentName: StudentName;
  private readonly bornYear: number;
  private readonly staticProps: StudentProps;

  constructor(
    studentName: StudentName,
    bornYear: number,
  ) {
    this.studentName = studentName;
    this.bornYear = bornYear;
    this.staticProps = {
      currentlyCoursing: null,
      coursedDegrees: []
    };
  }

  // Getters
  public getName(): string {
    return this.studentName;
  }

  public getAge(): number {
    const newDate = new Date();
    return newDate.getFullYear() - this.bornYear;
  }

  public getProps() {
    return this.staticProps;
  }

  // Simulates grade completion, adding this grade to coursedDegrees
  public completeGrade(): void {
    let { coursedDegrees, currentlyCoursing } = this.staticProps;
    coursedDegrees.push(currentlyCoursing?.getGradeInfo().gradeId);
    currentlyCoursing = null;
  }

  // Quit current grade (doesn't add it to coursedDegrees)
  private static quitGrade(student: Student): void {
    student.staticProps.currentlyCoursing = null;
  }
}
