import express from 'express'
import { Router } from 'express'
import { loginUser, signinUser,getMe, logOut} from '../controller/auth.controller.js'
import { refreshAccessToken } from '../controller/auth.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const authRouter=Router()

authRouter.post('/signin',signinUser)
authRouter.post('/login',loginUser)
authRouter.post('/logout',verifyJWT,logOut)
authRouter.post('/refresh-token', refreshAccessToken)
authRouter.get('/me',verifyJWT,getMe)
export default authRouter