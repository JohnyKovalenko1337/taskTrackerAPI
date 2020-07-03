const express = require('express');

const {body} = require('express-validator');

const taskController = require('../controllers/task');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/getTasks', taskController.getTasks);

router.put('/update/:taskId', isAuth, taskController.updateTask);

router.put('/update/status/inProgress/:taskId', isAuth, taskController.statusInProgress);

router.put('/update/status/done/:taskId', isAuth, taskController.statusDone);

router.delete('/delete/:taskId', isAuth, taskController.deleteTask);

router.post('/postTask', isAuth, taskController.postTasks);

module.exports = router;