const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//const isAuth = require('./middleware/is-auth');

//const db = require('./database/db');

//================== routes =======================
const taskRoutes = require('./routes/task.js');
//const authRoutes = require('./routes/auth.js');
//=======================================

app.use(bodyParser.json());     //application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    next();
})

app.use('/task',taskRoutes);
//db.execute('')


app.listen(8080,()=>{
    console.log('success');
});
