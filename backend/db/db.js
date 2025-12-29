import express from 'express'
import mongoose from 'mongoose';




const connectDB=async()=>{
         try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL
    );

    console.log(
      "MongoDB connected:",
      connectionInstance.connection.host
    );
     console.log(`Server is running at http://localhost:${process.env.PORT}`);
     console.log("DB NAME:", mongoose.connection.name);
  }
        catch(error){
          console.log('Error occured',error);  
        }
}
export {connectDB}