const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    /* const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
        
    } */
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    console.log(first_name,
        last_name,
        email,
        password)
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User(
                first_name,
                last_name,
                email,
                hashedPw
            );
            console.log(user);
            return user.save()
        })
        .then(result => {
            res.status(201).json({ message: `successfuly added new user: ${first_name} ` })
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
            loadedUser = user[0][0];
            return bcrypt.compare(password, loadedUser.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                res.status(401).send({ message: 'Password is wrong' });
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email, userId: loadedUser.id.toString()
                },
                'somesupersecret',
                {
                    expiresIn: '1h'
                });
            res.status(200).json({
                token: token,
                userId: loadedUser.id.toString()
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
};

exports.getAllUsers = (req, res, next) => {
    User.fetchAll()
        .then(result => {
            console.log('from controller', result[0]);
            res.status(200).json({
                message: "ALL THE USERS",
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
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            User.updateById(first_name, last_name, email, hashedPw, id)
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