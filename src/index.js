//A basic approach//
/*
import mongoose from 'mongoose';
import {DB_NAME} from "./constants.js";
import express from "express";
const app = express()


( async () => {
    try {
      await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      app.on("error", (error)=>{
        console.log("error", error);
        throw error
      })

      app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);

      })
    } catch (error) {
        console.log("error:", error)
        throw error
    }
    }
)()*/

// second approach//

import connectionDB from "./db/dbindex.js";
import dotenv from "dotenv";


dotenv.config({
  path: './env'
})
