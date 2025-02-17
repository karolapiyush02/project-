//imports
import { asyncHandler } from "../utils/asyncHandler.js"
import  ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import uploadoncloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

//seperate code for token generation 
const generateaccessandrefreshtokens = async(userid) =>{
  try {
  const user = await User.findById(userid)
  const accesstoken = user.generateAccessToken()
  const refreshtoken = user.generateRefreshToken()

  user.refreshToken = refreshtoken;
  user.save({validateBeforeSave: false})
  return {accesstoken, refreshtoken};
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating tokens for user.")
  }
}
console.log("generation of tokens is completed:", generateaccessandrefreshtokens);
console.log("user object details:", User);

// logic building operations 
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
const usercheck =  await  User.findById(createUser._id).select("-password -refreshToken"); // yeh code thoda time lega to await lgai
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
});

const loginUser = asyncHandler( async (req, res) => {
  
 const {email, username, password} = req.body;

 if(!email && !username){
  throw new ApiError(400, "please enter email or username to login.");
 }
  const user = await User.findOne({
  $or: [{email}, {username}]
 })
 if(!user){
  throw new ApiError(401, "user does not exist please register first.");
 }
 const correctpassword = await user.isPasswordCorrect(password)// password which we get from user
 if(!correctpassword){
  throw new ApiError(402, "password is incorrect, please try again.");
 }
 
 const {accesstoken, refreshtoken} = await generateaccessandrefreshtokens(user._id)
 console.log("Access Token:", accesstoken);
 console.log("Refresh Token:", refreshtoken);

 const login = await User.findById(user._id)
 .select("-password -refreshToken");
console.log("login details of user:", login);

const options = {
  httpOnly: true, 
  secure: true,
}
console.log("options:", options)

 res.status(200)
.cookie(  accesstoken, options)  
.cookie( refreshtoken, options)
.json(
new ApiResponse(200, {user: login, accesstoken, refreshtoken}, "user is logged in successfully")
)
 
});

const logoutUser = asyncHandler(async( req, res) => {

});

export {

  registerUser,
  loginUser,
  
}