const db = require('../database/db');

module.exports = class Task {
    constructor( title, description) {
        this.title = title;
        this.description = description;
    };

    save(){
        return db.execute('INSERT INTO tasks (title, description) VALUES (?, ?)',
        [this.title, this.description]);
    };
    //--------------------------status--------------------------------
    static setUser(userId){
        return db.execute('INSERT INTO tasks (userId) VALUES (?)',[userId]);
    }

    static inProgress(){
        return db.execute('INSERT INTO tasks (status) VALUES (?)',['In progress']);
    }

    static done(){
        return db.execute('INSERT INTO tasks (status) VALUES (?)',['DONE']);
    }
    // ----------------------------updating---------------------------
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
    static fetchAll(){
        return db.execute('SELECT * FROM tasks');
    }
}