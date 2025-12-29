import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import {connectDB} from './db/db.js';
import todoRouter from './routes/Todo.router.js';
import cookieParser from "cookie-parser";
import authRouter from './routes/Auth.router.js';
const PORT=process.env.PORT|| 3005;

dotenv.config({path:'./.env'})
const app=express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



app.use('/api',todoRouter)
app.use('/api',authRouter)

connectDB()
.then(
    app.listen(process.env.PORT || 3005, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
  )
.catch((err) => {
    console.log("Mongodb connection failed", err);
})



