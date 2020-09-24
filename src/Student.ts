import { Name } from "shared/sharedModels";

interface StudentProps {
  currentlyCoursing: Course | null;
  coursedDegrees: Course[];
}

export default class Student {
  private readonly name: Name;
  private bornYear: number;

  private readonly staticProps: StudentProps;

  constructor(name: Name, bornYear: number, staticProps: StudentProps) {
    this.name = name;
    this.bornYear = bornYear;
    this.staticProps = staticProps;
  }

  public getAge(): number {
    const newDate = new Date();

    return newDate.getFullYear() - this.bornYear;
  }
}
