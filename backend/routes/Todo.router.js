
import {getTodos,addTodo, deleteTodo, toggleTodoComplete} from './../controller/Todo.controller.js'
import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
const todoRouter=Router()


todoRouter.get('/',verifyJWT,getTodos)
todoRouter.post('/add',verifyJWT,addTodo)
todoRouter.delete('/:id',verifyJWT,deleteTodo)
todoRouter.patch('/toggle/:id',verifyJWT,toggleTodoComplete)

export default todoRouter