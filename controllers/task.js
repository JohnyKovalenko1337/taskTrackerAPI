const Task = require('../models/task');

exports.getTasks=(req,res,next)=>{
    Task.fetchAll()
    .then(result=>{
        console.log('from controller',result[0]);
        res.status(200).json({
            message:"ALL THE TASKS",
            tasks: result[0]
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postTasks=(req,res,next)=>{
    const title = req.body.title
    const description = req.body.description;
    console.log(title, description);
    task = new Task( title, description );
    console.log(task);
    task.save()
    .then(result=>{
        res.status(201).json({
            message:"task has been successfuly added B)",
        });
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.deletePost=(req,res,next)=>{
    const taskId = req.params.taskId;
    Task.deleteById(taskId)
        /* .then(result=>{
            return  User.findById(req.userId)
        })
        .then(user=>{
            user.posts.pull(postId);
            return user.save();
        }) */
        .then(result=>{
            res.status(200).json({message:'Post deleted successfuly',})
        })
        .catch(err=>{
            console.log(err);
        });
}