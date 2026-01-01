import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import {connectDB} from './db/db.js';
import todoRouter from './routes/Todo.router.js';
import cookieParser from "cookie-parser";
import authRouter from './routes/Auth.router.js';


dotenv.config({path:'./.env'})
const app=express();
const PORT=process.env.PORT|| 3005;
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))


app.use('/api',authRouter)
app.use('/api',todoRouter)


connectDB()
.then(
    app.listen(process.env.PORT || 3005, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
  )
.catch((err) => {
    console.log("Mongodb connection failed", err);
})



