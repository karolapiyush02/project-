//A basic approach//
/*
import mongoose from 'mongoose';
import {DB_NAME} from "./constants.js";
import express from "express";
const app = express()


( async () => {
    try {
      await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      app.on("error", ()=>{
        console.log("error", error);
        throw error
      })

      app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);

      })
    } catch (error) {
        console.log("error:", error)
        throw error
    }
    }
)()*/



// professional approach for connection to mongodb //

//you can use different files to connect connection in mongodb, first-rwrite your code in db_folder/dbserver.js_file and then execute it in the main index. js_file//

//through this method you code will be clean and easy to understand //

import dotenv from 'dotenv'
import connectionDB from "./db/dbserver.js";

dotenv.config({
    path: `./env`
})

connectionDB()
.then(
  app.on("error", (error)=>{
    console.log("error:", error)
    throw error
    })

    app.listen(process.env.PORT,()=>{
      console.log("app running on port ${process.emv.PORT}")
    })
)
/*.catch(error) {
  console.log('error')
}*/
