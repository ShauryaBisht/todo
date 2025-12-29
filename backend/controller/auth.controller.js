import mongoose from 'mongoose'
import {User} from '../models/User.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const signinUser= asyncHandler(async(req,res)=>{
          const {username,email,password}=req.body;
          console.log("REQ BODY:", req.body);

          if(!username||!email || !password)
              throw new ApiError(400,"All fields are mandatory")
          
          const existingUser = await User.findOne({ email });
          console.log("EXISTING USER:", existingUser);
              if (existingUser) {
                 throw new ApiError(409,"User already exists");
              }
              
          const user=await User.create({
               username:username,
               email:email,
               password:password
          })
          
          


          if(!user)
             throw new ApiError(400,"User not created")

          return res.status(200).json(new ApiResponse(200,"User created successfully"))
})

export {signinUser}
