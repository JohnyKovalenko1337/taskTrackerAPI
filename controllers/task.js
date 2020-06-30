const Task = require('../models/task');

exports.getTasks=(req,res,next)=>{
    Task.fetchAll()
    .then(result=>{
        console.log('from controller',result[0]);
        res.status(200).json({
            message:"success",
            tasks: result[0]
        });
    })
    .catch(err=>{
        console.log(err);
    })
}