import express from 'express'
import { Router } from 'express'
import { signinUser } from '../controller/auth.controller.js'


const authRouter=Router()

authRouter.post('/signin',signinUser)


export default authRouter