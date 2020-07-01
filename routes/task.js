const express = require('express');

const {body} = require('express-validator');

const taskController = require('../controllers/task');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/getTasks', taskController.getTasks);

router.delete('/delete/:taskId',taskController.deletePost)

router.post('/postTask', taskController.postTasks);

module.exports = router;