const Todo = require('../models/Todo');
const User=require('../models/User')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {token} = require('../utils/features');



exports.createTodo=async(req,res,next)=>{

  const { title, description } = req.body;
    const todo = new Todo({
        title,
        description,
        user:req.user
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({message:"task added"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getTodo = async (req, res, next) => {
 
  try {
    //user_id
    const userid = req.user._id;
    const tasks = await Todo.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

//edit todo

exports.updateTodo = async (req, res) => {
    try {
     
        const existingTodo = await Todo.findById(req.params.id);
        if (!existingTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        existingTodo.completed=!existingTodo.completed;
        await  existingTodo.save();

        res.status(200).json({
          message:"Task Updated"})

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 
exports.deleteTodo = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const existingTodo = await Todo.findOne({
            '_id': req.params.id,
            'user': req.user._id
        });

        if (!existingTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

       await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.editTodo = async (req, res) => {
    const { editId, title, description } = req.body;

    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const existingTodo = await Todo.findOne({
            '_id': editId,
            'user': req.user._id
        });

        if (!existingTodo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        existingTodo.title = title;
        existingTodo.description = description;
        const updatedTodo = await existingTodo.save();

        res.json({ message: 'Task edited', task: updatedTodo });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error editing task', error: error.message });
    }
};
