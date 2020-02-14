class Assignment {
    constructor(id, title, dueDate, status, currentDate, submissions, questions){
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.currentDate = currentDate;
        this.submissions = submissions; //based on amount of students in class?
        this.questions = questions;
    }
}

export default Assignment 