const db = require('../database/db');

module.exports = class Task {
    constructor( title, description, creator) {
        this.title = title;
        this.description = description;
        this.creator = creator
    };

    save(){
        return db.execute('INSERT INTO tasks (title, description, creator) VALUES (?, ?, ?)',
        [this.title, this.description, this.creator]);
    };
    //--------------------------status--------------------------------
    static updateUser(userId, id){
        return db.execute('UPDATE tasks SET userId = (?)  WHERE id = (?)',
        [userId,id]);
    }

    static inProgress(id){
        return db.execute('UPDATE tasks SET status = (?) WHERE id = (?)',['In progress',id]);
    }

    static done(id){
        return db.execute('UPDATE tasks SET status = (?) WHERE id = (?)',['DONE',id]);
    }
    // ----------------------------updating---------------------------
    static setUser(userId, taskId){
        return db.execute('UPDATE tasks SET userId = (?) WHERE id = (?)',[userId, taskId]);
    }

    static updateById(title, description, id){
        return db.execute('UPDATE tasks SET title = (?), description = (?)  WHERE id = (?)',
        [title,description,id]);
    }
    // --------------------------deleting----------------------------
    static deleteById(id){
        return db.execute('DELETE FROM tasks WHERE id = (?)',[id]);
    }
    // ------------------------finding by id------------------------
   static findById(id){
        return db.execute('SELECT * FROM tasks WHERE id = (?)',[id]);
   }
   //--------------------------fething all tasks-----------------------
    static fetchAll(status){
        return db.execute('SELECT * FROM tasks WHERE status = (?)',[status]);
    }
}