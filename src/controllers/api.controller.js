//------- Dependencies
    import fs from 'fs'
    import path from 'path';
    import * as url from 'url';
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//------- Service
    import vehiclesService from '../services/vehicles.service.js';
    import complementaryService from '../services/complementary.service.js';

//------- Utils
    import { defineWhere, sortTypes } from "../utils/filters.util.js"
    import { readData } from '../utils/vehicles.util.js';
    import { generateColumn } from '../utils/table.util.js';



//----------------- VEHICLES CONTROLLERS
const vehicles_findAll = async (req,res)=>{
    //--- Where and attributtes
    const where = defineWhere({}, req.query)
    const attributes = ['id_vehicle','version','image','price','model','type','traction','km']
    
    //--- Ordering
    const order = []
    if(req.query.order) order[0] = sortTypes[req.query.order]
    
    //--- Pagination
    const { page = 0, size = 6 } = req.query
    const pagination = { offset: (+page) * (+size), limit: +size }
    
    //--- Service
    const data = await vehiclesService.findAll({ where, attributes, pagination, order })

    res.json(data)
}

const vehicles_findOne = async (req,res) => {
    const where = { id_vehicle: req.params.id }

    const data = await vehiclesService.findOne(where)

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

    const modifiedData = await vehiclesService.modify(id, req.body)

    res.json(modifiedData)
}

const vehicles_delete = async (req,res) => {
    const where = { id_vehicle: req.params.id }
    const deletedData = await vehiclesService.destroy(where)

    res.json(deletedData)
}


//----------------- MARKS CONTROLLERS
const marks_findAll = async(req,res) => {
    const data = await complementaryService.marks_findAll ({ attributes: ['id_mark', 'name'] })
    
    res.json(data)
}


//----------------- USERS CONTROLLERS
const users_findAll = async(req,res) => {
    const attributes = (req.query.type == 'full')
        ? ['id_user','name','subname','city','image','phone','rol']
        : ['id_user','name','subname']

    const data = await complementaryService.users_findAll({ attributes })

    res.json(data)
}

//----------------- TAGS CONTROLLERS
const tags_findAll = async(req,res) => {
    const attributes = ['id_tag','name']

    const data = await complementaryService.tags_findAll({ attributes })

    res.json(data)
}


//-------------- EXPORT
export default {
    vehicles_findAll,
    vehicles_findOne,
    generateCSV,
    vehicles_submit,
    vehicles_modify,
    vehicles_delete,
    marks_findAll,
    users_findAll,
    tags_findAll
}