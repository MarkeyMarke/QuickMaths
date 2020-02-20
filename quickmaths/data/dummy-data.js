import Assignment from '../models/Assignment';
import Course from '../models/Courses';
import Student from '../models/Student';
import Remaining from '../models/Remaining';

export const COURSE_ASSIGNMENTS = [
    new Assignment('a1', 'Long Division HW', new Date('December 17, 2020 03:24:00'), 'Published', '7/20/19', 30, []),
    new Assignment('a2','Long Addition HW', new Date('December 25, 2020 03:24:00'), 'Published', '7/20/19', 23, []),
    new Assignment('a3','Mixed Math HW', new Date('December 1, 2020 03:24:00'), 'Drafted', '7/29/19', 1, []),
];

export const COURSES = [
	new Course('c1', "Ms. Honda's Class", 'Class of 2017', '123456789'),
	new Course('c2', "Ms. Honda's Class", 'Class of 2018', '123456789'),
	new Course('c3', "Ms. Honda's Class", 'Class of 2019', '123456789')
];

export const STUDENT_ASSIGNMENTS = [
    new Assignment('a1', 'Long Division HW', 'Due 9/12/19', '0/5 problems', '7/20/19', 30, []),
    new Assignment('a2','Multiplication HW', 'Due 9/13/19', 'Completed', '7/20/19', 14, []),
    new Assignment('a3','Long Subtraction HW', 'Due 9/10/19', '1/3 problems', '7/29/19', 12, []),
];

export const STUDENTS = [
	new Student('s1', 'Student Name', 'Student Email'),
	new Student('s2', 'Student Name', 'Student Email'),
	new Student('s3', 'Student Name', 'Student Email')
];

export const STUDENT_REMAINING = [
	new Remaining('s1', 'Student Name', 'Student ID', 'Completed'),
	new Remaining('s2', 'Student Name', 'Student ID', 'Incompleted'),
	new Remaining('s3', 'Student Name', 'Student ID', 'Incompleted')
];
