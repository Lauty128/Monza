//----- Dependencies
    import express from "express";
    import cors from 'cors';
    import morgan from 'morgan'
    import { environment } from "./config/env.js";


//----- Config
    if(environment == 'dev') morgan('dev') 
    const app = express()
    const PORT = process.env.PORT || 4000

//----- Middlewares
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors({origin:true}))

//----- Routes
    import { apiRouter } from "./routes/api.routes.js"; 
    import { pagesRouter } from "./routes/pages.routes.js";
    app.use("/", pagesRouter)
    app.use("/api", apiRouter)

//----- Listen
    app.listen(PORT, ()=>{
        console.log("Server on in port " + PORT);
    })