class Assignment {
    constructor(id, title, dueDate, publishDate, submissions){
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.publishDate = publishDate;
        this.submissions = submissions; //based on amount of students in class?
    }

    getDateText(date){
        return ((date.substring(5,7)+'/'+date.substring(8,10)+'/'+date.substring(0,4)));
    }
}

export default Assignment; 