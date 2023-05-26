    import express from "express";

//---- Config
    const router = express.Router()

//--- Middlewares

//-------------------- Routes
//-------- VEHICLES
    //- GET
    router.get("/", (req,res)=>{
        res.send("URL => /api/vehicles (GET)")
    })
    router.get('/csv', (req,res)=>{
        res.send("URL => /api/csv (GET)")
    })
    router.get("/:id", (req,res)=>{
        res.send("URL => /api/vehicles/:id (GET)")
    })

    //- POST
    router.post("/", (req,res)=>{
        res.send("URL => /api/vehicles (POST)")
    })

    //- DELETE
    router.delete("/:id", (req,res)=>{
        res.send("URL => /api/vehicles/:id (DELETE)")
    })

    //- PUT
    router.put("/:id", (req,res)=>{
        res.send("URL => /api/vehicles/:id (PUT)")
    })

export { router as apiRouter }
