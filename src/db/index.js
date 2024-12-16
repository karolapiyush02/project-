import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";

const connectionDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n mongodb connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongodb connection error:", error);
        process.exit(1)
        
    }
}


export default connectionDB;