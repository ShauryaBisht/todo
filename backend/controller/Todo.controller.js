import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiResponse}  from '../utils/ApiResponse.js' 
import { ApiError } from '../utils/ApiError.js';
import { Todo } from '../models/Todo.model.js';
 const getTodos=asyncHandler(async(req,res,next)=>{
       const todos=await Todo.find({user: req.user._id});
       return res.status(200).json(new ApiResponse(200,todos,"Successful"))
})


const addTodo=asyncHandler(async(req,res,next)=>{
  console.log("REQ.USER:", req.user);
    const {title,description,priority,dueDate,completed}=req.body
    
    if (
        [title,priority,completed].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const todo=await Todo.create({
      title,description,priority,dueDate,completed:false,user: req.user._id,
    })
    res.status(200).json(new ApiResponse(200,todo,"Todo created successfully"))
})

const deleteTodo=asyncHandler(async(req,res,next)=>{
     const deleted=await Todo.deleteOne({_id:req.params.id,user: req.user._id})
     
  if (deleted.deletedCount === 0) {
    return res.status(404).json(
      new ApiResponse(404, null, "Todo not found")
    );
  }

     return res.status(200).json(new ApiResponse(200,null,"Todo deleted successfully"))
})


const toggleTodoComplete = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.status(200).json(new ApiResponse(200, todo, "Updated"));
});

export {getTodos,addTodo,deleteTodo,toggleTodoComplete}