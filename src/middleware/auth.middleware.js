import  {User}  from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accesstoken || req.header
    ("Authorization")?.replace("Bearer ", "")
    
    //console
    console.log("cookies:", req.cookies)//defined
    console.log("Access Token from Cookies:", req.cookies?.accesstoken)//defined
    console.log("Authorization Header:", req.header("Authorization"))//undefined as predicted
    console.log("token recieved:", token)//defined
    
    
    
    
    if(!token){
      throw new ApiError(401, "unauthorized requiest")
    }
  
     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
     console.log("decoded ID:", decoded)
  
    const user = await User.findById(decoded?._id).select("-password -refreshToken")
    console.log("final user details:", user)

    if(!user){
      //discussion about frontend
      throw new ApiError(401, "invalid access token")
    }
    req.user = user;
    next()
  } catch (error) {
   throw new ApiError(401, "invalid!!!!!") 
  }

});

export default verifyJWT;