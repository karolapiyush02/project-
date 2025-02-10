import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


//Now we have to configrate cloudinary//

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // cloud name phele hi set ho kr ata h  
   api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("api key:", process.env.CLOUDINARY_API_KEY);
console.log("api secret:", process.env.CLOUDINARY_API_SECRET);
console.log("cloud name:", process.env.CLOUDINARY_CLOUD_NAME);  




const uploadoncloudinary = async (localfilepath) => {
    try {
             //check if the file exist or not
        if(!localfilepath || !fs.existsSync(localfilepath))
            {
                console.log("file not found", localfilepath);
                return null;
            }
            console.log("uploading file", localfilepath);

              //upload on cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        });

             //file has been uploades successfully
        console.log("file is uploaded on cloudinary", response.url);
        //response 
        return response
    
    } catch (error) {
        console.log("error in uploading file on cloudinary", error.message);

        //ensure safe deletion of temp file if exists 
        if(
            fs.existsSync(localfilepath)
        ){
            fs.unlinkSync(localfilepath);
        }{
            return null;
        }
    };
      
       
    

};


    
export default uploadoncloudinary;