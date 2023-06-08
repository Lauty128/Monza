//----- Dependencies
    import express from "express";
    import cors from 'cors';
    import morgan from 'morgan'
    import { environment, port } from "./config/env.js";
    import path from 'path';
    import * as url from 'url';

//----- Config
    if(environment == 'dev') morgan('dev') 
    const app = express()
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const PORT = port || 4000

//------ Template Engine
    app.set('view engine', 'ejs');
    app.set('views', './src/views')

//----- Middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors({origin:['http://localhost:5173']}))
    app.use(express.static(path.join(__dirname, '/public'))) // Public folder config

//----- Routes
    import { apiRouter } from "./routes/api.routes.js"; 
    import { pagesRouter } from "./routes/pages.routes.js";
    app.use("/", pagesRouter)
    app.use("/api", apiRouter)

//----- Listen
    app.listen(PORT, ()=>{
        console.log("Server on in port " + PORT);
    })