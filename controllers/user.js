const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/task');

exports.signup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    console.log(first_name,
        last_name,
        email,
        password)
    bcrypt.hash(password, 12)           // hashing password
        .then(hashedPw => {
            const user = new User(
                first_name,
                last_name,
                email,
                hashedPw
            );
            console.log(user);
            return user.save()          //and save it to database
        })
        .then(result => {
            res.status(201).json({ message: `successfuly added new user: ${first_name} ${last_name} ` })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOneByEmail(email)
        .then(user => {
            if (!user) {
                res.status(401).send({ message: 'user couldnt be found' });
            }
            loadedUser = user[0][0];                // taking user with found email
            return bcrypt.compare(password, loadedUser.password);       //comparing passwords
        })
        .then((isEqual) => {
            if (!isEqual) {
                res.status(401).send({ message: 'Password is wrong' });
            }
            const token = jwt.sign(                 // signing user
                {
                    email: loadedUser.email, userId: loadedUser.id.toString()
                },
                'somesupersecret',          // with this secret
                {
                    expiresIn: '1h'             // token will expire in 1 hour
                });
            res.status(200).json({              // returning token and userId
                token: token,
                userId: loadedUser.id.toString()
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
};

exports.getAllUsers = (req, res, next) => {
    const limit = 3;
    // page number
    const page = req.query.page || 1;
    // calculate offset
    const offset = (page - 1) * limit;
    User.fetchAll(limit, offset)
        .then(result => {
            console.log('from controller', result[0]);
            res.status(200).json({
                message: "ALL THE USERS",
                products_page_count:result[0].length,
                page_number:page,
                users: result[0],
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    const id = Number.parseInt(userId);
    User.findById(id)
        .then(result => {
            res.status(200).json({
                message: "Your user info",
                user: result[0]
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.updateUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const userId = req.params.userId;
    const id = Number.parseInt(userId);
    bcrypt.hash(password, 12)                       //hashing password
        .then(hashedPw => {
            User.updateById(first_name, last_name, email, hashedPw, id)     //put in constructor hashed version
                .then(result => {
                    res.status(200).json({
                        message: "succesfuly updated!",
                    })
                })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    const id = Number.parseInt(userId);
    User.deleteById(id)                             
        .then(result => {
            res.status(200).json({ message: 'User deleted successfuly', })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getFreeUsers = (req, res, next) => {
    User.fetchFreeUsers()
        .then(result => {
            if (!result) {
                res.status(200).json({
                    message: "No free users",
                });
            }
            else {
                res.status(200).json({
                    message: "Free users",
                    user: result[0]
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.giveTask = (req, res, next) => {
    const userId = req.params.userId;
    const userychid = Number.parseInt(userId);
    const taskId = req.params.taskId;
    const taskychId = Number.parseInt(taskId);
    User.giveTask(taskychId, userychid)                       //giving task for the user
        .then(result => {
            return Task.setUser(userychid, taskychId);          //setting to task executer
        })
        .then(result => {
            return Task.inProgress(taskychId);              //changing status of task
        })
        .then(result => {
            res.status(200).json({
                message: "task has been successfuly added"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}