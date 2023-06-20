//----- Dependencies
    import express from "express";
    import cors from 'cors';
    import morgan from 'morgan'
    import { environment, port } from "./config/env.js";

//----- Config
    if(environment == 'dev') morgan('dev') 
    const app = express()
    const PORT = port || 4000


//----- Middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())

//----- Routes
    import { apiRouter } from "./routes/api.routes.js"; 
    app.use("/api", apiRouter)

//----- Listen
    app.listen(PORT, ()=>{
        console.log("Server on in port " + PORT);
    })