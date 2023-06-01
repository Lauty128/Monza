//---- Services
import Service from "../services/api.service.js";

export async function readData(callback, { size = 20 } = {}){
    const service = new Service('vehicle')
    const attributes = ['id_vehicle','version','image','extra_images','price','model','type','traction','km']

    let pagination = { offset:0 , limit: size }
    const vehiclesData = await service.findAll({ pagination, attributes })
    let data = vehiclesData.data

    const total_of_vehicles = vehiclesData.total
    for (let page = 0; (page * size) <= total_of_vehicles; page++) {
        if(page > 0){
            //---- If there are more of one page then read the other page in the data base
            pagination.offset = (page * size) 
            const newVehiclesData = await service.findAll({ pagination, attributes })
            data = newVehiclesData.data
        }

        data.forEach( vehicle => callback(vehicle) )
        //returns the callback for each element
    }
} 

export const images_of_vehicle = vehicle => [vehicle.image, ...vehicle.images]