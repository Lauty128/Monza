    import express from "express";

//---- Config
    const router = express.Router()

//---- Middleware

    //----- Middleware to validate the user

//--- Routes
    router.get("/", (req,res)=>{
        res.send("HOME")
    })

    router.get("/vehicle/:id", (req,res)=>{
        console.log(req.params.id);

        res.send("VEHICLE VIEWER")
    })


export { router as pagesRouter }