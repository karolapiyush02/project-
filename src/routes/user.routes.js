import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

//const router = () => {
    const routerInstance = Router();
    routerInstance.post('/register', registerUser);
   // return routerInstance;
//}


export default routerInstance;

