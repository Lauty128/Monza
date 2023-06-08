//------- Models
import { Mark } from "../models/vehicles.model.js"
import { User } from '../models/users.model.js'
import { Tag} from "../models/tags.model.js"


async function marks_findAll({ where={}, order=[], attributes=[] }){
    try{
        const data = await Mark.findAll({
            where,
            attributes,
            order
        })
        const status = (data) ? 200 : 204

        return {
            status, 
            data
        }
    }
    catch(error){
        return {
            status: 500,
            message:"Ocurrio un error mientras se solicitaban los datos",
            error
        }
    }
}

async function users_findAll({ where={}, order=[], attributes=[] }){
    try{
        const data = await User.findAll({
            where,
            attributes,
            order
        })
        const status = (data) ? 200 : 204
        
        return {
            status, 
            data
        }
    }
    catch(error){
        return {
            status: 500,
            message:"Ocurrio un error mientras se solicitaban los datos",
            error
        }
    }
}

async function tags_findAll({ where={}, order=[], attributes=[] }){
    try{
        const data = await Tag.findAndCountAll({
            where,
            attributes,
            order,
        })
        const status = (data) ? 200 : 204
        
        return {
            status, 
            data
        }
    }
    catch(error){
        return {
            status: 500,
            message:"Ocurrio un error mientras se solicitaban los datos",
            error
        }
    }
}

export default {
    marks_findAll,
    users_findAll,
    tags_findAll
}