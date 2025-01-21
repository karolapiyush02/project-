import {asynchandler} from "../utils/asynchandler.js"

//we created a method and pass a async function within/
 
const registerUser = asynchandler( async (req, res) => {
  res.status(200).json({
    message: "ok"
  })
})

//user.contrller will register the user in the database 

export {
  registerUser
}