import Assignment from '../models/Assignment';
import Course from '../models/Courses';

export const ASSIGNMENTS = [
    new Assignment('a1', 'Long Division HW', '9/12/19', 'Published', '7/20/19'),
    new Assignment('a2','Long Addition HW', '9/13/19', 'Published', '7/20/19'),
    new Assignment('a3','Mixed Math HW', '9/25/19', 'Drafted', '7/29/19'),
];

export const COURSES = [
    new Course('c1', "Ms. Honda's Class", 'Class of 2017', '123456789'),
    new Course('c2', "Ms. Honda's Class", 'Class of 2018', '123456789'),
    new Course('c3', "Ms. Honda's Class", 'Class of 2019', '123456789')
];