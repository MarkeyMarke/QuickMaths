class StudentAssignment {
    constructor(id, title, dueDate, progress, totalQuestions){
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.progress = progress;
        this.totalQuestions = totalQuestions;
    }

    getDueDateText(){
        return ((this.dueDate.getMonth()+1).toString()+'/'+this.dueDate.getDate().toString()+'/'+this.dueDate.getFullYear().toString());
    }

    getProgressText(){
        if(this.progress === this.totalQuestions){
            return "Completed";
        }
        return this.progress + "/" + this.totalQuestions + " problems";
    }
}

export default StudentAssignment;