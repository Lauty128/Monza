//------------- Dependencies
    import express from "express";
    import multer from "../config/multer.js";
    import { validate } from "../middlewares/validate.js";

//------------- Config
    const router = express.Router()
    const filesMulter = [
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 6 }
    ]

//------------- Controllers
    import Controllers from "../controllers/api.controller.js";

//------------- Middlewares
    router.use(validate)

//-------------------- Routes   
//-------- VEHICLES ----------------
    //- GET
    router.get("/vehicles", Controllers.vehicles_findAll)
    router.get("/vehicles/:id", Controllers.vehicles_findOne)
    
    router.get('/csv', Controllers.generateCSV )

    //- POST
    router.post("/vehicles", multer.fields(filesMulter) ,Controllers.vehicles_submit)

    //- DELETE
    router.delete("/vehicles/:id", Controllers.vehicles_delete)

    //- PUT
    router.put("/vehicles/:id", Controllers.vehicles_modify)

//---------- MARKS ----------------
    //- GET
    router.get("/marks", Controllers.marks_findAll)

//-------- USERS ------------------
    //- GET
    router.get("/users", Controllers.users_findAll)

//-------- TAGS --------------------
    //- GET
    router.get("/tags", Controllers.tags_findAll)

export { router as apiRouter }
