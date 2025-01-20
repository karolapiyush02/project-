import mongoose, {Schema}  from mongoose;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
      usename:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
      },
      email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      fullname:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      avatar:{
        type: String, // clouding url
        required: true
      },
      coverimage:{
        type: String, //clouding url,
      },
      watchhistory:{
        type: Schema.type.objectID,
        Ref: "Video" 
      },
      password:{
        type:String,
        required: [True, 'password is required']
      },
      refreshtoken:{
        type: string
      }
    },
    {
      Timestamps: true
    },
)
//middleware to check if the password is changes or not//
UserSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10)
  next()
})
 // if password is correct //
UserSchema.methods.isPasswordCorrect = async function(password){
 return  await bcrypt.compare(password, this.password)
}
// how to generate Access_Token //
UserSchema.methods.generateAccessToken = function(){
   return jwt.sign(
    {
      _id: this_id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
// how to generate Refresh_Token //
UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this_id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model('User', UserSchema);
