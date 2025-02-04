import {v2 as cloudinary} from "cloudinary";
import {fs} from "fs";

//Now we have to configrate cloudinary//

cloudinary.config({
cloud_Name:process.env.Cloudinary_CloudName,
api_Key:process.env.Cloudinary_Apikey,
api_Secret:process.env.Cloudinary_Apisecret
});

const uploadoncloudinary = async (localfilepath) => {
    try {
        if(!localpath) return null
        // NOw to upload the file on cloudinary//
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        //file has been uploades successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        //what is the file is not uploaded on the services server 
        // so we have to unlink the file from our server
        //for safe cleaning perpose

        fs.unlinkSync(localfilepath)// remove the locl saved temp file 
        return null;
    }
}


export default uploadoncloudinary;