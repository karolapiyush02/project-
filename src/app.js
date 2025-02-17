import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()



app.use(cors({
    origin: process.env.Cors_Origin,
    credientials: true
}))

// more settings for backend to communicate with frountend data
// data like from url, body, direct form and json forms//

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes inbetween 
//note:- this userRouter is randome name for import
//you have to export default to give randome name
import  routerInstance  from "../src/routes/user.routes.js";


//routes declaration


/*this function will move backwords*/ 

app.use("/api/v1/users", routerInstance )

export {app} 

/*app.js(api/v1/users)->userRouter(/register)->RegisterUser-> resonse(200,ok)*/