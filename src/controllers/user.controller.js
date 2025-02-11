//imports
import { asyncHandler } from "../utils/asyncHandler.js"
import  ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import uploadoncloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"



/*
const registerUser = asyncHandler( async ( req, res ) => {  
  res.status(200).json({  
    message: "ok"  
  })
})*/


// logic building operations 

// userdetails from frontend:
const registerUser = asyncHandler( async ( req, res ) => {  
  const { fullname, email, username, password} = req.body;
    console.log("fullname:", fullname, "email:", email,
     "username:", username, "password:", password); //check the user details



 //check if the user has entered all the details
//user trim to check if the details are right
if(!fullname.trim() || !email.trim()  || !username.trim()  || !password.trim() ) {
  throw new 
        ApiError(400, "Please enter all the details, details not matched");
 }   

 //to check user is existing or not
const existerUser = await User.findOne({
  $or: [{ email: email }, { username: username }],
 })

if(existerUser) {
  throw new 
        ApiError(400, "User already exists, email or username has been taken"); 
 }


 //check for the files object
 console.log("req.files:", req.files);

 //check for avatar and coverimage
 const avatarlocalpath = req.files?.avatar?.[0]?.path;
 const coverimagelocalpath = req.files?.coverimage?.[0]?.path || null ;

 //check the path of  avatar image
 console.log("avatar file local path:", avatarlocalpath)
//check the path of cover image
console.log("cover image file path:", coverimagelocalpath);

 //images can be available or not
if(!avatarlocalpath){
  throw new 
        ApiError(400, "Please upload avatar image, avatar image is required");
} 

//uploadoncloudinary
const avatar = await uploadoncloudinary(avatarlocalpath);
const coverimage = await uploadoncloudinary(coverimagelocalpath);

//if not uploaded on cloudinary
if(!avatar){
  throw new 
        ApiError(500, "Image upload failed");
}

// if everything is ok, then create a new user
  const createUser = await User.create({
  fullname,
  email,
  username:username.toLowerCase(),
  password,
  avatar: avatar.url,
  coverimage:  "", // coverimage is optional so it is empty
})

//remove users password and refreash token from response
const usercheck =  await  User.findById(createUser._id).select("-password -refreshtoken"); // yeh code thoda time lega to await lgai
console.log("user found:", usercheck);

//check if user already exists or not
if (!usercheck) {
  throw new 
        ApiError(500, "User not found, user not created");  
  
}

//response
return res.status(201).json(
  new ApiResponse(201, usercheck, "user created successfuully"
));

//login for users

const loginUser = asuncHandler(async (req, res) => {
  //get user details 
  const {email, username, password} = req.body;

  //check if user has enter all details right
  if(!email.trim() || !username.trim()){
    throw new 
          ApiError(400, "please enter the email or username to login");
  }
  //find the user
  const user = await User.findOne({
    $or: [{ email: email}, {username: username}]
  })
  if (!User) {
    throw new 
          ApiError(404, "User not found, please register first");
  }
  //is password correct
  const passwordvalidate = User.isPasswordCorrect(password);//this (password) is from req.body, User from  model.
  if(!passwordvalidate){
    throw new 
          ApiError(400, "password is incorrect, please enter the correct password");
  }
  //generate access and refresh token
  
}) 


});
export {

  registerUser,
  loginUser
}

