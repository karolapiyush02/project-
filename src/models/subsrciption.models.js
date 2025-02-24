import mongoose, {Schema} from "mongoose";

const SubscriptionSchema = new Schema({

Subscribe:{
    type: Schema.Type.ObjectId;
    ref: "User"
},
channel:{
    type: Schema.Type.ObjectId;
    ref: "User"
},
{
    Timestamps: true,
}

})

export const Subscription = mongoose.model("Subscription", SubscriptionSchema)