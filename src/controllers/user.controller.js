import { asyncHandler } from "../utils/asyncHandler.js"

//make a const name registerUser

const registerUser = asyncHandler( async ( req, res ) => {
  
  res.status(200).json({
    message: "ok"
  })
})


//export this function and use it in user.routes.js
export { registerUser }
