class StudentAssignment {
    constructor(id, title, dueDate, progress, totalQuestions){
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.progress = progress;
        this.totalQuestions = totalQuestions;
    }

    getDueDateText(){
        return ((this.dueDate.substring(5,7)+'/'+this.dueDate.substring(8,10)+'/'+this.dueDate.substring(0,4)));
    }

    getProgressText(){
        if(this.progress === this.totalQuestions){
            return "Completed";
        }
        return this.progress + "/" + this.totalQuestions + " problems";
    }
}

export default StudentAssignment;