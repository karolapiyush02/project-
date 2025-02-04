import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js";

//const router = () => {
    const routerInstance = Router();
    routerInstance.post('/register',
        upload.fields([
            { name: 'avatar', maxCount: 1 },
            { name: 'coverimage', maxCount: 1 }
        ]), registerUser);
   // return routerInstance;
//}


export default routerInstance;

