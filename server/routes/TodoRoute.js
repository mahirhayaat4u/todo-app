const express= require('express');
const { createTodo, updateTodo, deleteTodo, fetchUserTodo, fetchTodoDetails } = require('../controllers/Todo');
const { auth } = require('../middleware/auth');
const router = express.Router();


router.post("/createTodo",auth,createTodo)
router.put("/updateTodo",auth,updateTodo)
router.delete("/deleteTodo",auth,deleteTodo)
router.get("/getUserTodos",auth,fetchUserTodo)
router.get("/todoDetails",fetchTodoDetails)


module.exports = router;