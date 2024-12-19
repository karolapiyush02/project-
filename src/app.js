import express from "express"
import cors from "cors"
import  cookieparser  from "cookie-parser"

const app = express()

//now we have to config the cors//

app.use(cors({
    orign: process.env.CORSE_ORIGIN,
    credentials: true,
}))

//now we have to config the express for better usability of the app
//by configering the express.js it can help to optimise the api 

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieparser())

export {app}