const db = require('../database/db');

module.exports = class Task {
    constructor(id, title, description, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    };

/*     save(){

    }; */

    static fetchAll(){
        return db.execute('SELECT * FROM tasks')
        /* .then(result=>{
            //console.log(result);
            console.log('success from model');
        })
        .catch(err=>{
            console.log('from model ',err);
        }) */
    }
}