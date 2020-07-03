const db = require('../database/db');

module.exports = class User {
    constructor(first_name, last_name, email, password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    };

    save() {
        return db.execute('INSERT INTO user (first_name, last_name, email, password) VALUES (?,?,?,?)',
            [this.first_name, this.last_name, this.email, this.password]);
    };
    // ----------------------------------------- fetching -----------------------------------
    static fetchAll() {
        return db.execute('SELECT * FROM user');
    }

    static fetchFreeUsers(){
        return db.execute('SELECT * FROM user WHERE taskId IS NULL');
    }

    // ----------------------------updating---------------------------

    static giveTask(taskId, userId){
        return db.execute('UPDATE user SET taskId = (?) WHERE id = (?)',
        [taskId, userId]);
    }
    
    static updateById(first_name, last_name, email, password, id) {
        return db.execute('UPDATE user SET first_name = (?), last_name = (?), email = (?), password = (?)  WHERE id = (?)',
            [first_name, last_name, email, password, id]);
    }
    // ----------------------------finding -------------------------------------
    static findOneByEmail(email) {
        return db.execute('SELECT * FROM user WHERE email = (?)', [email]);
    }


    static findById(id) {
        return db.execute('SELECT * FROM user WHERE id = (?)', [id]);
    }

    // -----------------------------deleting--------------------------------
    static deleteById(id) {
        return db.execute('DELETE FROM user WHERE id = (?)', [id]);
    }
}