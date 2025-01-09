import mongoose, {Schema}  from mongoose;
import jsonwebtoken from "jsonwebtoken";
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

UserSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10)
  next()
})
 
UserSchema.methods.isPasswordCorrect = async function(password){
 return  await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', UserSchema);

