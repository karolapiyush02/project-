import { Router } from "express";
import { registerUser, loginUser, logoutUser, 
changepassword, gettinguser, updatinguserdetails } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import  verifyJWt  from "../middleware/auth.middleware.js";


    const routerInstance = Router();
    routerInstance.post('/register',
        upload.fields([
            { name: 'avatar', maxCount: 1 },
            { name: 'coverimage', maxCount: 1 }
        ]), registerUser);
  
routerInstance.route('/login').post(loginUser);

//secured routes

routerInstance.route("/logout").post(verifyJWt, logoutUser)
routerInstance.route("/change/password").post(verifyJWt, changepassword)
routerInstance.route("/getting/user/details").post(verifyJWt, gettinguser)
routerInstance.route("/updating/users/details").post(verifyJWt, updatinguserdetails)



export default routerInstance;

