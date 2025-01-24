import { Router } from "express"
import {registerUser} from "../controllers/user.controller.js"



const router = router()


router.route("/register").post(
    //we have used fields middleware in the user.routes.js file
    // so we can check that the avatar and coverimage is not empty
    upload.fields([
        {
            name: "avatar",
            maxcount: 1
        },
        {
            name: "coverimage",
            maxcount: 1
        }
    ]),
    registerUser)
    export default Router 