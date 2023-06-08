//---- Dependencies
    import express from "express";

    //---- Controllers and Middlewares
    import Middleware from '../middlewares/authenticate.js'
    import pagesControllers from "../controllers/pages.controllers.js";
    
//---- Config
    const router = express.Router()
    
//---- Middleware
    router.use(Middleware.authenticate)

    
//--- Routes
    router.get("/", pagesControllers.home)

    router.get("/:id", pagesControllers.view)
    router.get("/edit/:id", pagesControllers.edit)
    router.get("/create", pagesControllers.create)

    router.get("/login", pagesControllers.login)
    router.post("/login", pagesControllers.validateLogin)


export { router as pagesRouter }