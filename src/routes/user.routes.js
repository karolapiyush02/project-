import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
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

export default routerInstance;

