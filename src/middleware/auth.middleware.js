import { ApiError } from "../error/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";



  const verifyJWt = asyncHandler( async (req, res, next) => {
      //verify token came from user 
  try {
    const token = req.cookies?.accesstoken || 
    req.header ("Authorization")?.replace("Bearer ", "")// " " users acces token.
        //check token is  not avilable 
    if(!token){
      throw new 
           ApiError( 401, "Unauthorised request")
    }  
       //if token is avilable
    const decodedtoken = await jwt.verify(token, process.env.Access_Token_Secret)//compairing token with secret key 
       //  await?    
    
      //delete password and refreshtoken from decodedtoken
      const user = await user.findById(decodedtoken?._id).select("-password -refreshtoken")     
      console.log("decodedtoken:", decodedtoken);
      console.log("user:", user);
  
      //if user is not avilable
      //discussion with team frontend
      if(!User){
          throw new 
               ApiError(404, "invalid access token, user not found")
      }
      
      req.user = user;
      next()
  } catch (error) {
    throw new 
         ApiError(401, error?.message || "invalid access token")
  }


})

export { verifyJWt } 