const express = require('express');

const {body} = require('express-validator');

const taskController = require('../controllers/task');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/tasks', taskController.getTasks);

module.exports = router;