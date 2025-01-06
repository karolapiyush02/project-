import mongoose, {Schema}  from mongoose;

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


export const User = mongoose.model('User', UserSchema);

