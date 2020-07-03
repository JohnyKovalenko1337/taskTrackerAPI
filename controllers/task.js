const Task = require('../models/task');
const User = require('../models/user');

exports.getTasks = (req, res, next) => {
    /* const currentPage = req.query.page || 1;
    const perPage = 5;
    totalItems = Task.countItems(); */
    Task.fetchAll()
        .then(result => {
            console.log('from controller', result[0]);
            res.status(200).json({
                message: "ALL THE TASKS",
                tasks: result[0],
                /*  totalItems: totalItems */
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.postTasks = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description;

    const creator = Number.parseInt(req.userId);
    task = new Task(title, description, creator);
    console.log(task);
    task.save()
        .then(result => {
            res.status(201).json({
                message: "task has been successfuly added B)",
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
};

exports.deleteTask = (req, res, next) => {
    const taskId = req.params.taskId;
    const id = Number.parseInt(taskId);
    let worker;
    Task.findById(id)
        .then(result => {
            const task = result[0][0];
            console.log(task);
            worker = task.userId;
            if (worker === null) {
                return Task.deleteById(id);
            }
            else {
                return User.findById(worker)
                    .then(result => {
                        const user = result[0][0];
                        console.log(user);
                        user.taskId = null;
                        return user.save();
                    })
                    .then(result => {
                        return Task.deleteById(id);
                    })
            }
        })
        .then(result => {
            res.status(200).json({ message: 'Task deleted successfuly', })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.updateTask = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description;
    const taskId = req.params.taskId;
    const id = Number.parseInt(taskId);
    Task.findById(id)
        .then(taskych => {
            status = taskych[0][0].status;
            if (status === 'view') {
                return Task.updateById(title, description, id)
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: "succesfuly updated!",
                        })
                    })
            }
            else {
                return res.status(200).json({
                    message: "failed to update a task, because this task not on the view)"
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.statusInProgress = (req, res, next) => {
    const taskId = req.params.taskId;
    const id = Number.parseInt(taskId);
    Task.inProgress(id)
        .then(result => {
            res.status(200).json({
                message: "status updated to IN PROGRESS"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
};

exports.statusDone = (req, res, next) => {
    const taskId = req.params.taskId;
    const id = Number.parseInt(taskId);
    Task.done(id)
        .then(result => {
            res.status(200).json({
                message: "status updated to Done"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });;
        })
};