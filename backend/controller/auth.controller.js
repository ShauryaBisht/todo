
import {User} from '../models/User.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId)
       const accessToken= user.generateAccessToken()
       const refreshToken= user.generateRefreshToken()
       user.refreshToken=refreshToken
       await user.save({validateBeforeSave:false})
       return {accessToken,refreshToken}
    } catch (error) {
        console.log(error);
    }
}

const signinUser= asyncHandler(async(req,res)=>{
          const {username ,email , password}=req.body;
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

const loginUser=asyncHandler(async(req,res)=>{
        const {email,password}=req.body;
        if(!email || !password)
             throw new ApiError(400,"All fields are required")
        const user=await User.findOne({email:email}).select("+password")
        if(!user)
             throw new ApiError(400,"User does not exist")

       const correctPassword= await user.isPasswordCorrect(password)
       if(!correctPassword)
          throw new ApiError(400,"Incorrect password")
       
       const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)
            
           const loggedInUser= await User.findById(user._id).select("-password -refreshToken")
           const options={
               httpOnly:true,
               secure:false
           }
           return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options)
           .json(
               new ApiResponse(200,{
                   user:loggedInUser,accessToken,refreshToken
               },"User logged in successfully")
           )
})
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

 
  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token has been revoked");
  }
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  
  const options = {
    httpOnly: true,
    secure: false
    
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken },
        "Access token refreshed successfully"
      )
    );
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});


export {signinUser,loginUser,refreshAccessToken,getMe}
