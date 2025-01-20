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



// use Routers here//

import userRouter from "./route/user.routes.js";



// declaration of routes//

app.use("/api/v1/users", userRouter)



export {app} 