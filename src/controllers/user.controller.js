import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utilis/ApiError.js"
import {user} from "../models/user.models.js"
import { uploadoncloudinary } from "../servicesfolder/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
//we created a method and pass a async function within/
 
const registerUser = asynchandler( async (req, res) => {

//how to build ligic in making controller
//Step1> get users details from frontend:-

const {fullname, username, email, password} = res.body
   console.log(`fullname: ${fullname}, username: ${username},
     email: ${email}, password: ${password}`)

//Step2 check for empty spaces in user field:-
  //usin if-else statements to validate the user fields:-
   if(fullname === ""){
    throw new ApiError(400, "fullname is required")
   }if(username === ""){
    throw new ApiError(400, "username is required")
   }if(email === ""){
    throw new ApiError(400, "email is required")
   }if(password === ""){
    throw new ApiError(400, "password is required")
   }
   console.log("all field are valid for registering the user")

//Step3 check if the user alredy exist in the DB:-
  // these user models can contact to expess directly.
   const existeduser = await  user.findOne({
     $or:[{username}, {email}]
 })
    if(registerUser){
      throw new ApiError(409, "this user email or name already existed.");
    }

//Step4 check for image and avatar in the DB:-
  
//we have to user res.fields to check avatar and coverimage
   //the middleware we added in the route.js provide us
   // few new features which can be helpfull in 
   //requesting and adding new fields in the validation format:-
   
   const avatarlocalpath = req.files?.avatar[0]?.path;
   const coverimageloalpath =  req.files?.coverimage[0]?.path;

   // their is no possibility that the images are avilable
   // but we have to put a check on avatar image 
   //Setp5 check wheather the avatar image is avilable or uploaded
  if(!avatarlocalpath){
      throw new ApiError(400, " avatar image is necessary to register")
    }
  // Step6 if avatar is there then upload it on cloudinary
    const avatar = await 
       uploadoncloudinary(avatarlocalpath)
    const coverimage = await
      uploadoncloudinary(coverimageloalpath)
      // avatar is a required field,
      //so we have to put a check on it
    if(!avatar){
        throw new ApiError (400, "avatar is required")
      }
  //Step7 create the user DB entry 
   //we have to use `user` to create the DB entry

   const user = await
     user.create({
      fullname, 
      username: username.tolowerCase(), 
      email,
      password,
      avatar: avatar.url,
      coverimage: coverimage?.url || "" // not required 
    })
  
 //Step8 to check user is created
 // hide password and refresh token:-
  const createduser = await user.findbyId(user._id)
   .select("-password -refreshtoken")
   if(!createduser){
    throw new ApiError(500, "server problem")
   }
//Step9 return response:-
   return res.status(201).json(
     ApiResponse(200,  "created user successfully")
   ) 

    })

export { 
  registerUser,
}