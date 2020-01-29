import Assignment from '../models/Assignment';
import Course from '../models/Courses';

export const COURSE_ASSIGNMENTS = [
    new Assignment('a1', 'Long Division HW', '9/12/19', 'Published', '7/20/19', 30),
    new Assignment('a2','Long Addition HW', '9/13/19', 'Published', '7/20/19', 23),
    new Assignment('a3','Mixed Math HW', '9/25/19', 'Drafted', '7/29/19', 1),
];

export const COURSES = [
    new Course('c1', "Ms. Honda's Class", 'Class of 2017', '123456789'),
    new Course('c2', "Ms. Honda's Class", 'Class of 2018', '123456789'),
    new Course('c3', "Ms. Honda's Class", 'Class of 2019', '123456789')
];

export const STUDENT_ASSIGNMENTS = [
    new Assignment('a1', 'Long Division HW', 'Due 9/12/19', '0/5 problems', '7/20/19', 30),
    new Assignment('a2','Multiplication HW', 'Due 9/13/19', 'Completed', '7/20/19', 14),
    new Assignment('a3','Long Subtraction HW', 'Due 9/10/19', '1/3 problems', '7/29/19', 12),
];