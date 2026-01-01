import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";

export const verifyJWT = async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
  throw new ApiError(401, "User not found");
}
       req.user = user;
    
    console.log("Cookies:", req.cookies);

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Access Token");
  }
};
