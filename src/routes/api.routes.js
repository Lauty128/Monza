//------------- Dependencies
    import express from "express";

//------------- Config
    const router = express.Router()

//------------- Controllers
    import Controllers from "../controllers/api.controller.js";

//------------- Middlewares

//-------------------- Routes
//-------- VEHICLES
    //- GET
    router.get("/vehicles", Controllers.vehicles_findAll )
    router.get("/vehicles/:id", Controllers.vehicles_findOne)
    
    router.get('/csv', Controllers.generateCSV )

    //- POST
    router.post("/vehicles", (req,res)=>{
        res.send("URL => /api/vehicles (POST)")
    })

    //- DELETE
    router.delete("/vehicles/:id", Controllers.vehicles_delete )

    //- PUT
    router.put("/vehicles/:id", Controllers.vehicles_modify)

//-------- MARKS
    //- GET
    router.get("/marks", Controllers.marks_findAll )

//-------- USERS
    //- GET
    router.get("/users", Controllers.users_findAll )

//-------- TAGS
    //- GET
    router.get("/tags", Controllers.tags_findAll )

export { router as apiRouter }
