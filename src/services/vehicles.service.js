//------- Models
import { Vehicle, Mark } from "../models/vehicles.model.js"
import { User } from '../models/users.model.js'
import { Tag, Vehicle_Tag } from "../models/tags.model.js"
import { sequelize } from "../config/sequelize.js";


async function findAll({ where={}, order=[], pagination={}, attributes=[] }){
    const include = [
        { model: Mark, attributes:['id_mark','name'] },
        { model:User, attributes:['name','subname','id_user'] }
    ]

    try{
        const { count, rows } = await Vehicle.findAndCountAll({
            where,
            attributes,
            include,
            order,
            ...pagination
        })
        const status = (count > 0) ? 200 : 204
        
        return {
            total:count,
            status, 
            data:rows
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

async function findOne(where={}){
    const include = [
        { model: Mark, attributes:['name'] },
        { model:User, attributes:['name','subname','id_user'] },
        { model: Tag, trough: Vehicle_Tag, attributes:['name'] }
    ]
    // This <include> is longer, because when searching for a single vehicle, we want to get more detailed data

    try{
        const data = await Vehicle.findOne({
            where,
            include
            // Attributes is not added, because we want all the data
        })

        return data
    }
    catch(error){
        return {
            status: 500,
            message:"Ocurrio un error mientras se solicitaban los datos",
            error
        }
    }
}

async function create(body){

}

async function modify(id, body){
    try{
        const where = { id_vehicle: id }
        const vehicleData = await Vehicle.findOne({ where })

        if(!vehicleData){
            // If the searched vehicle does not exist, then a message with error code 204 is returned 
            return {
                status:204,
                message:"No se encontro ninguna coincidencia"
            }
        }

        const newData = { ...vehicleData, ...body }
        // It creates a new object with the actual vehicle data and the new data 
        const modifiedVehicle = await Vehicle.update(newData, { where })
        return {
            data: modifiedVehicle,
            status:200,
            message:"El elemento se elimino correctamente"
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

async function destroy(where){
    const transaction = await sequelize.transaction()
    // It creates a transaction to avoid incompleted operations 
    try{
        const data = await Vehicle.findOne({ where })
        
        if(data){
            // If the vehicle exist, then it find the tags that are relationed with this vehicle and deletes them
            const tags = await Vehicle_Tag.findAll({ where })
            tags.forEach(async tag => {
                await Vehicle_Tag.destroy({where: { id_vehicle_tag: tag.id_vehicle_tag}})
            });

            // Finally, the vehicle searched is deleted
            await Vehicle.destroy({where})
        }
        else{
            return {
                status:204,
                message: "No se encontraron coincidencias"
            }
        }

        await transaction.commit()
        // The transaction is finished and a message is returned
        return {
            status:200,
            message:"Elemento eliminado correctamente"
        }
    }
    catch(error){
        console.log(error);
        return{
            message: "Ocurrio un error mientras se eliminaban los datos",
        }
    }
}


export default {
    findAll,
    findOne,
    modify,
    destroy
};