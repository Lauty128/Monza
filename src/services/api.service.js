//------- Models
import { Vehicle, Mark } from "../models/vehicles.model.js"
import { User } from '../models/users.model.js'
import { Tag, Vehicle_Tag } from "../models/tags.model.js"
import { sequelize } from "../config/sequelize.js";


const modelsList = {
    user: User,
    vehicle:Vehicle,
    mark: Mark,
    tag:Tag,
    vehicle_tag: Vehicle_Tag
}

class Service{
    constructor(model){
        this.model = modelsList[model];
        this.modelName = model
    }

    async findAll({ where={}, order=[], pagination={}, attributes=[] }){
        let include = [
            { model: Mark, attributes:['id_mark','name'] },
            { model:User, attributes:['name','subname','id_user'] }
        ]
        // <include> gets data from other tables that are related to vehicles table

        if(this.modelName !== 'vehicle') include = []
        // This include only is used when the model is <Vehicle>. With the others is an empty array

        try{
            const { count, rows } = await this.model.findAndCountAll({
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

    async findOne(where={}){
        const include = [
            { model: Mark, attributes:['name'] },
            { model:User, attributes:['name','subname','id_user'] },
            { model: Tag, trough: Vehicle_Tag, attributes:['name'] }
        ]
        // This <include> is longer, because when searching for a single vehicle, we want to get more detailed data

        try{
            const data = await this.model.findOne({
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

    async create(body){

    }

    async modify(id, body){
        try{
            const where = { [`id_${this.modelName}`]: id }
            const vehicleData = await this.model.findOne({ where })

            if(!vehicleData){
                // If the searched vehicle does not exist, then a message with error code 204 is returned 
                return {
                    status:204,
                    message:"No se encontro ninguna coincidencia"
                }
            }

            const newData = { ...vehicleData, ...body }
            // It creates a new object with the actual vehicle data and the new data 
            const modifiedVehicle = await this.model.update(newData, { where })
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

    async delete(where){
        try{
            const deletedData = await this.model.destroy({ where })
            
            if(deletedData == 0){
                return {
                    quantity:deletedData,
                    status:204,
                    message:"No se encontro ninguna coincidencia"
                }
            }

            return {
                quantity:deletedData,
                status:200,
                message:"El elemento se elimino correctamente"
            }
        }
        catch(error){
            console.log(error);
            return {
                status: 500,
                message:"Ocurrio un error mientras se eliminaban los datos",
                error
            }
        }
    }

    async deleteVehicle(where){
        const transaction = await sequelize.transaction()
        // It creates a transaction to avoid incompleted operations 
        try{
            const data = await this.model.findOne({ where })
            
            if(data){
                // If the vehicle exist, then it find the tags that are relationed with this vehicle and deletes them
                const tags = await Vehicle_Tag.findAll({ where })
                tags.forEach(async tag => {
                    await Vehicle_Tag.destroy({where: { id_vehicle_tag: tag.id_vehicle_tag}})
                });

                // Finally, the vehicle searched is deleted
                await this.model.destroy({where})
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
}

export default Service;