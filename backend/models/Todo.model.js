import mongoose, { mongo } from "mongoose";

const todoSchema=new mongoose.Schema({
 title:{
  type:String,
  required:true,
 },
 description:{
  type:String,
 },
 priority:{
  type:String,
  enum: ["low", "medium", "high"],
  default:"low"
 },
 dueDate:{
  type:Date,
  required:false
 },
 completed: {
      type: Boolean,
      default: false,
    },
user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true
}

},{timestamps:true})

   export const Todo=mongoose.model("Todo",todoSchema)