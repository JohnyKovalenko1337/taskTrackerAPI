const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/signup', [
    body('email').isEmail().withMessage('Please input valid email'),
    body('first_name').trim().notEmpty().isString(),
    body('last_name').trim().notEmpty().isString(),
    body('password', 'Please enter password with only text and numbers at least 5 symbols').trim()
        .isLength({ min: 5 }).isAlphanumeric(),

], userController.signup);

router.post('/login', userController.login);

router.get('/getUsers', isAuth, userController.getAllUsers);

router.get('/getUser/:userId', isAuth, userController.getUser);

router.get('/getFree', isAuth, userController.getFreeUsers);

router.put('/update/:userId', isAuth, userController.updateUser);

router.delete('/delete/:userId', isAuth, userController.deleteUser);

router.put('/giveTask/:taskId/forUser/:userId', isAuth, userController.giveTask)

module.exports = router;