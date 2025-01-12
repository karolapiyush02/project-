import mongoose,  {Schema, schema} from "mongoose";

const videoSchema = new Schema(
    {
        videofile:{
            type: String,
            re: true
        },
        thumbnail:{
            type: String,
            re: true
        },
        title:{
            type: String,
            re: true
        },
        discription:{
            type: String,
            re: true
        },
        duration:{
            type: String,
            re: true
        },
        views:{
            type: number,
            default: 0
        },
        published:{
            type: Boolean,
        default: true
        },
        owner:{
            type: schema.type.objectid,
            re: 'user'
        }

      
    }
)

export  const videos = mongoose.model("video", videoSchema )