import express from 'express'
import {getTodos,addTodo, deleteTodo, toggleTodoComplete} from './../controller/Todo.controller.js'
import { Router } from 'express'
const todoRouter=Router()

todoRouter.get('/',getTodos)
todoRouter.post('/add',addTodo)
todoRouter.delete('/:id',deleteTodo)
todoRouter.patch('/toggle/:id',toggleTodoComplete)

export default todoRouter