//imports
import { asyncHandler } from "../utils/asyncHandler.js"
import  ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import uploadoncloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

//seperate code for token generation 
const generateaccessandrefreshtokens = async(userid) =>{
  try {
    //console
  console.log("featching user info with ID:", userid)//done

    const user = await User.findById(userid)
    //console  
  console.log("user found:", user)//done with refreshToken 

  //check if user existed or not
  if(!user){
    throw new ApiError(404, "user is not found.")
  }

  const accesstoken = user.generateAccessToken(userid)
  const refreshtoken = user.generateRefreshToken(userid)
  
  //console
  console.log("generated access:", accesstoken)//done
  console.log("generated refresh:", refreshtoken)//done

                                                 //note:- jab bhi code me koi galati ho or 
                                                //solution dhundneh pr bhi nahi mile to
                                               //code ko thoda-thoda theek krna
                                              //or thoda-thoda  hi execute krna 
                                             //phir shayad thodi jaankari mile ki code galat kaha h
  user.refreshToken = refreshtoken;
   await user.save({validateBeforeSave: false})
  
   return {accesstoken ,
           refreshtoken}  
                           

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
  

 
  const login = await User.findById(user._id)
  .select("-password -refreshToken");
 console.log("login details of user:", login);
 
 
 
 
  res.status(200)
 .cookie("accesstoken",  accesstoken, {
  httpOnly: true,
    secure: true,
   
 })  
 .cookie( "refreshtoken", refreshtoken, {
  httpOnly: true,
    secure: true,
    
 })
 .json(
 new ApiResponse(
  
  200, 
  {
    user: login,  accesstoken,  refreshtoken
  },
   "user is logged in successfully"
  
  )
 )
  
 });

const logoutUser = asyncHandler(async( req, res) => {

  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1 // this will remove the field
      }
    },
    {
      new: true
    }
  )

  

  return res
  .status(200)
  .clearCookie("accesstoken", {
    httpOnly: true,
    secure: false,
    path: "/"
  })
.clearCookie("refreshtoken", {
  httpOnly: true,
    secure: false,
    path: "/"
})
  .json(
    new ApiResponse(200, {}, "user logged out.")
  )

});

const changepassword = asyncHandler(async(req, res) => {

const {currentpassword, newpassword, confermpassword} = req.body;

console.log("Fields in request.Body are bellow:", req.body);//check

const user = await User.findById(req.user?.id)
console.log("password changer user details:", user)

const correctpassword = await user.isPasswordCorrect(currentpassword);
//compairing both the passwords in user and give
console.log("the value of correct password:", correctpassword)

if(!correctpassword){
  throw new ApiError(400,
    "the password user enter is incorrect, please enter correct password to make changes."
  )
};

if(newpassword !== confermpassword){
  throw new ApiError(400, "password does not match to change, changes denied.")
}

user.password = new password;
await user.save({validateBeforeSave: false})

});

const gettinguser = asyncHandler(async(req, res) => {
   
  return res
  .status(200)
  .json(200, req.user, "current user details are here.")

});

const updatinguserdetails = asyncHandler(async( req, res ) => {

const {fullname , email} = req.body;
console.log("provided details by user for update:", req.body);

if(!fullname || !email){
  throw new ApiError(400, "please provide details for updating the details for user.")
}

const user = User.findByIdAndUpdate(
  req.user?._id,
  {
    $set: {
      fullname,
      email: email,
    }
  },
  {new: true}
).select("-password")//like a new user delete password 
//console
console.log("details of user:", user)

return res
.status(200)
.json(new ApiResponse(201, "New details are updated for user."))
});

const updateavatar = asyncHandler(async(req, res) => {
  
  const avatarlocalpath = req.file?.path
  //check
  console.log("avatar image path is given by the user:", req.file.path);

  if(!avatarlocalpath.url){
    throw new ApiError(400, "user must provide new avatar to change it")
  }
  console.log("url of avatar image:", avatarlocalpath.url)//check
  console.log("user Id:", req.user?._id)//check
  
  const user = await User.findByIdAndUpdate(
    req.user?._id,
   
    {
      $set: {
        avatar: avatarlocalpath.url
      }
    },
    {
      new: true,
    }
  ).select("-password")
  console.log("user details with  new avatar.url update:", user)

});

const updatecoverimage = asynchandler(async( req, res) => {

  const coverimagelocalpath = req.file?.path
  //check
  console.log("coverimage path is given by the user:", req.file.path);

  if(!coverimagelocalpath.url){
    throw new ApiError(400, "user must provide new coverimage to change it")
  }
  console.log("url of avatar image:", coverimagelocalpath.url)//check
  console.log("user Id:", req.user?._id)//check
  
  const user = await User.findByIdAndUpdate(
    req.user?._id,
   
    {
      $set: {
        coverimage: coverimagelocalpath.url
      }
    },
    {
      new: true,
    }
  ).select("-password")
  console.log("user details with  new coverimage.url  update:", user)

});



export {

  registerUser,
  loginUser,
  logoutUser,
  changepassword,
  gettinguser,
  updatinguserdetails,
  updateavatar,
  updatecoverimage,
}