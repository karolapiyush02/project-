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
// step1:-
// userdetails from frontend:
const registerUser = asyncHandler( async ( req, res ) => {  
  const { fullname, email, username, password} = req.body;
    console.log("fullname:", fullname, "email:", email,
     "username:", username, "password:", password); //check the user details



 //check if the user has entered all the details
//user trim to genuinely check for right details
if(!fullname.trim() || !email.trim()  || !username.trim()  || !password.trim() ) {
  throw new 
        ApiError(400, "Please fill all the fields");
 }   

 //to check user is existing or not
const existerUser = await User.findOne({
  $or: [{ email: email }, { username: username }],
 })
if(existerUser) {
  throw new 
        ApiError(400, "User already exists"); 
 }

 //check for avatar and coverimage
 const avatarlocalpath = req.files?.avatar[0]?.path;
 const coverimagelocalpath = req.files?.coverimage[0]?.path;

 //check for the files object
 console.log("req.filesobject:", req.files);

 //check the path of  avatar image
 console.log("avatar file local path:", avatarlocalpath)
//check the path of cover image
console.log("cover image file path:", coverimagelocalpath);

 //images can be available or not
if(!avatarlocalpath){
  throw new 
        ApiError(400, "Please upload an avatar image");
} 

//using cloudinary config
console.log("using cloudinary config:", cloudinary.config());
console.log("cloudinary module:", cloudinary);


//uploadoncloudinary
const avatar = await uploadoncloudinary(avatarlocalpath);
const coverimage = await uploadoncloudinary(coverimagelocalpath);
//if not uploaded on cloudinary
if(!avatar){
  throw new 
        ApiError(500, "Image upload failed");
}

//user entry in databse 
const enterUser = await User.create({
  fullname,
  username:username.tolowercase(),
  avatar: avatar.url,
  coverimage: coverimage?.url || "",
  email,
  password,
})

//check if user is created in databse:-
 const createdUser = await username.findbyId(enterUser._id)
 .select("-password -refreshtoken")

 if(!createdUser){
   throw new 
        ApiError(500, "something went wrong whie creating the user");
 }

 //send response 
 return res.status(201).json(
  new ApiResponse(200, createdUser, "User created successfully" )
 )

})
export { registerUser }