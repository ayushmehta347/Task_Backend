const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { authenticated } = require('../middleware/auth');
const ProfileController=require('../controllers/profileController')

router.post('/signup',ProfileController.signup);
router.post('/signin',ProfileController.login);
router.get('/logout' ,ProfileController.logout);
router.post('/newtask', authenticated,todoController.createTodo);
router.get('/gettask',authenticated, todoController.getTodo);
router.post('/update/:id', authenticated, todoController.updateTodo);
router.post('/:id', authenticated, todoController.deleteTodo);
router.put('/edit',authenticated,todoController.editTodo)

module.exports = router;
