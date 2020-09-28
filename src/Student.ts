import { StudentName } from "shared/sharedModels";
import Grade from "./Grade";

export interface StudentProps {
  currentlyCoursing: Grade | null;
  coursedDegrees: Grade[];
}

export default class Student {
  private readonly studentName: StudentName;
  private readonly bornYear: number;
  private readonly staticProps: StudentProps;

  constructor(
    studentName: StudentName,
    bornYear: number,
    staticProps: StudentProps
  ) {
    this.studentName = studentName;
    this.bornYear = bornYear;
    this.staticProps = staticProps;
  }

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

  public completeGrade(): void {
    let { coursedDegrees, currentlyCoursing } = this.staticProps;
    coursedDegrees.push(currentlyCoursing!);
    currentlyCoursing = null;
  }

  // Quit current grade
  private static quitGrade(student: Student): void {
    student.staticProps.currentlyCoursing = null;
  }
}
