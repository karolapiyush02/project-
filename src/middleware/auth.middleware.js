import ApiError from "../utils/ApiError.js" 
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken";



export const verifyJWT = asyncHandler (async(req, res, next)=>{
  try {
    const token = req.cookie?.accesstoken || 
    req.header("Authorisation")?.replace("bearer ", "")
    if(!token){
      throw new ApiError(401, "unauthorized requiest");
    }
    const decodedtoken = await jwt.varify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findbyId(decodedtoken?._id).select
    ("-password -refreshtoken")
    console.log("decodedtoken details:", decodedtoken);
    if(!user){
      throw new ApiError(420, "invalid token.");
    }
    req.user = user;
    next()
  } catch (error) {
    throw new ApiError(402, error.message || "inavlid access token");
  }
})

