import Assignment from "../models/Assignment";
import Course from "../models/Courses";
import Student from "../models/Student";
import Remaining from "../models/Remaining";
import Question from "../models/Question";
import StudentAssignment from "../models/StudentAssignment";

export const COURSE_ASSIGNMENTS = [
  new Assignment(
    "a1",
    "Long Division HW",
    new Date("December 17, 2020 03:24:00"),
    "Published",
    "7/20/19",
    30
  ),
  new Assignment(
    "a2",
    "Long Addition HW",
    new Date("December 25, 2020 03:24:00"),
    "Published",
    "7/20/19",
    23
  ),
  new Assignment(
    "a3",
    "Mixed Math HW",
    new Date("December 1, 2020 03:24:00"),
    "Drafted",
    "7/29/19",
    1
  )
];

export const COURSES = [
  new Course("c1", "Ms. Honda's Class", "Class of 2017", "123456789"),
  new Course("c2", "Ms. Honda's Class", "Class of 2018", "123456789"),
  new Course("c3", "Ms. Honda's Class", "Class of 2019", "123456789")
];

export const STUDENT_ASSIGNMENTS = [
  new StudentAssignment(
    "a1",
    "Long Division HW",
    new Date("December 12, 2020 03:24:00"),
    0, //progress
    3 //total
  ),
  new StudentAssignment(
    "a2",
    "Multiplication HW",
    new Date("December 13, 2020 03:24:00"),
    1, //progress
    3 //total
  ),
  new StudentAssignment(
    "a3",
    "Long Subtraction HW",
    new Date("December 1, 2020 03:24:00"),
    3, //progress
    3 //total
  )
];

export const STUDENTS = [
  new Student("s1", "Student Name", "Student Email"),
  new Student("s2", "Student Name", "Student Email"),
  new Student("s3", "Student Name", "Student Email")
];

export const STUDENT_REMAINING = [
  new Remaining("s1", "Student Name", "Student ID", "Completed"),
  new Remaining("s2", "Student Name", "Student ID", "Incompleted"),
  new Remaining("s3", "Student Name", "Student ID", "Incompleted")
];

export const QUESTIONS = [
  new Question("q1", "1+13", "14"),
  new Question("q2", "2+3", "5"),
  new Question("q3", "5+5", "10")
];
