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

//import routes inbetween
//to give a random name to your
//import you have to `export default` for it//

import userRouter from "./routes/user.routes.js"

// when ever we declair our routes we practice 
//this type of configration
//where routes are in different folder

app.use("/api/v2/users", userRouter)

//http://localhoast:8000/api/v1/users/register


export app;