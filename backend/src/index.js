import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})
import {app} from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server connected on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("error while connecting mongodb",error)
})