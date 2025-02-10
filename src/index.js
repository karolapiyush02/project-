//A basic approach//
//imports
import mongoose from 'mongoose';
import {DB_NAME} from "./constants.js";
import { app } from "../src/app.js";

console.log("environment variable loaded successfully");;






( async () => {
    try {
      await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      app.on("error", (error)=>{
        console.log("error", error);
        throw error
      })

      app.listen(process.env.PORT, () => {
        console.log(`app is listining on PORT ${process.env.PORT}`);

      })
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED !!", error)
        
    }
    }
)()



