import mongoose,  {Schema, schema} from "mongoose";
import mongooseAggregatePaginate from 
"mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videofile:{
            type: String, //cloudinary url
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
            type: String, //cloudinary url
            re: true
        },
        views:{
            type: number,
            default: 0
        },
        ispublished:{
            type: Boolean,
            default: true
        },
        owner:{
            type: schema.type.objectid,
            re: "user"
        }

      
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export  const videos = mongoose.model("video", videoSchema )