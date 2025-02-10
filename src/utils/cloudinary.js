import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

//Now we have to configrate cloudinary//

cloudinary.config({
cloud_Name:process.env.CLOUDINARY_CLOUD_NAME,
api_Key:process.env.CLOUDINARY_API_KEY,
api_Secret:process.env.CLOUDINARY_API_SECRET
});

console.log(cloudinary.config());




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
      
        /*fs.unlinkSync(localfilepath)// remove the locl saved temp file 
        return null;*/
    }



export default uploadoncloudinary;