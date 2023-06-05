//------- Dependencies
    import fs from 'fs'
    import path from 'path';
    import * as url from 'url';
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//------- Service
    import Service from "../services/api.service.js"

//------- Utils
    import { defineWhere } from "../utils/filters.util.js"
    import { readData } from '../utils/vehicles.util.js';
    import { generateColumn } from '../utils/table.util.js';


//----------------- Vehicles
const vehicles_findAll = async (req,res)=>{
    const where = defineWhere({}, req.query)
    const attributes = ['id_vehicle','version','image','price','model','type','traction','km']

    const { page = 0, size = 6 } = req.query
    const pagination = { offset: (+page) * (+size), limit: +size }

    const service = new Service('vehicle')
    const data = await service.findAll({ where, attributes, pagination })

    res.json(data)
}

const vehicles_findOne = async (req,res) => {
    const where = { id_vehicle: req.params.id }

    const service = new Service('vehicle')
    const data = await service.findOne(where)

    res.json(data)
}

const generateCSV = async (req,res) => {
    //----- config
    let text = `"id","title","description","availability","inventory","condition","price","link","image_link","additional_image_link","brand","sale_price","google_product_category"`
    const url = path.join(__dirname, '../../excel/monza-list.csv')

    //----- Generating Content
    await readData(vehicle=>{
        text += generateColumn(vehicle)
    })

    //----- Creating file and Download it 
    fs.writeFileSync(url, text)
    res.download(url)
}

const vehicles_submit = async (req,res) => {

}

const vehicles_modify = async (req,res) => {
    const { id } = req.params
    const service = new Service('vehicle')

    const modifiedData = await service.modify(id, req.body)

    res.json(modifiedData)
}

const vehicles_delete = async (req,res) => {
    const where = { id_vehicle: req.params.id }
    const service = new Service('vehicle')
    const deletedData = await service.deleteVehicle(where)

    res.json(deletedData)
}

//----------------- Users
const marks_findAll = async(req,res) => {
    const pagination = { offset: 0, limit: 15 }

    const service = new Service('mark')
    const data = await service.findAll({ pagination, attributes: ['id_mark', 'name'] })

    res.json(data)
}

//----------------- Mark
const users_findAll = async(req,res) => {
    const attributes = (req.query.type == 'full')
        ? ['id_user','name','subname','city','image','phone','rol']
        : ['id_user','name','subname']
    const pagination = { offset: 0, limit: 10 }

    const service = new Service('user')
    const data = await service.findAll({ pagination, attributes })

    res.json(data)
}


export default {
    vehicles_findAll,
    vehicles_findOne,
    generateCSV,
    vehicles_submit,
    vehicles_modify,
    vehicles_delete,
    marks_findAll,
    users_findAll
}