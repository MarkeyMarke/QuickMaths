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

    getDueDateText(){
        return ((this.dueDate.getMonth()+1).toString()+'/'+this.dueDate.getDate().toString()+'/'+this.dueDate.getFullYear().toString());
    }
}

export default Assignment 