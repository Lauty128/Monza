//------- Dependencies
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    import path from 'path';
    import * as url from 'url';

//------- Models
import { User } from "../models/users.model.js";

//------- Config
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//------- Controllers
const home = (req,res)=>{
    res.sendFile( path.join(__dirname + '../views/index.html'))
}

const view = (req,res)=>{
    res.sendFile( path.join(__dirname + '../views/index.html'))
}

const edit = (req,res)=>{
    console.log(req.params.id);

    res.send("VEHICLE VIEWER")
}

const create = (req,res)=>{
    console.log(req.params.id);

    res.send("VEHICLE VIEWER")
}

const login = (req,res)=>{
    const data = { 
        message: { message: "HOLANDA PAPA", status:true } 
    }
    res.render('login', data)
}

const validateLogin = async (req,res)=>{
    const { user, password } = req.body
    const userData = await User.findOne({ where:{ user } })

    if(userData){
        if(!bcrypt.compareSync(password ,userData.dataValues.password)) return res.json()
        
    }
    else{
        req.vali
        req.validateData
        res.status(401).json({ status:401, message:'No existe ningun usuario con ese nombre' })
    }
}

export default {
    home,
    view,
    edit,
    create,
    login,
    validateLogin
}