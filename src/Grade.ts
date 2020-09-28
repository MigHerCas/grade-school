import { gradeName, StudentName } from "shared/sharedModels";
import GradeSchool from "./GradeSchool";
import Student from "./Student";

export interface Requirement {
  minimumAge?: number;
  requiredGrades?: number[];
}

export interface GradeInfo {
  gradeId: number;
  gradeName: gradeName;
  requirements: Requirement[];
}

export default class Grade extends GradeSchool {
  private readonly gradeInfo: GradeInfo;
  private readonly enrolledStudents: Student[] = [];

  constructor(gradeInfo: GradeInfo) {
    super();
    this.gradeInfo = gradeInfo;
  }

  // Getters
  public getGradeInfo(): GradeInfo {
    return this.gradeInfo;
  }

  public getEnrolledStudents(): Student[] {
    return this.enrolledStudents;
  }

  // List students
  public listStudents(): string[] {
    let names: string[] = [];

    this.enrolledStudents.map((enrolledStudent) => {
      names.push(enrolledStudent.getName());
    });

    return names.sort((nameA, nameB) => {
      return nameA.localeCompare(nameB);
    });
  }

  public grade(): void {}
}
