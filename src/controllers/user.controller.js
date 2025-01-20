import {asychandler} from "../utilities/asynchandles.js";

const registerUser = asynchandler( async (req, res) => {
     res.status(200).json({
        message:"ok, The connection is working!!"
  })
})

export {registerUser}