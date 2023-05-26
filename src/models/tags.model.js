//-------- dependencies
import { sequelize } from '../config/sequelize.js';

//---- Utils
import { createPassword } from '../utils/table.util.js'
import { DataTypes } from "sequelize";

//---- Models
import { Vehicle } from './vehicles.model.js';


export const Tag = sequelize.define('tag',{
    id_tag:{
        type: DataTypes.STRING(10),
        defaultValue: createPassword(10),
        primaryKey: true
    },
    name: DataTypes.STRING(30)
})

export const Vehicle_Tag = sequelize.define('vehicle_tag',{
    id_vehicle_tag:{
        type: DataTypes.STRING(22),
        defaultValue: createPassword(22),
        primaryKey: true
    },
    id_tag: DataTypes.STRING(10),
    id_vehicle: DataTypes.STRING(22)
}, { timestamps:false })

//--------- Relations
Vehicle.belongsToMany(Tag, {
    through:Vehicle_Tag,
    foreignKey:"id_vehicle"
})

Tag.belongsToMany(Vehicle, {
    through:Vehicle_Tag,
    foreignKey:"id_tag"
})

//--------- Old relation
//Vehicle.hasMany(Vehicle_Tag, { foreignKey: 'id_vehicle' })
//Tag.hasMany(Vehicle_Tag, { foreignKey: 'id_tag' })

//Vehicle_Tag.belongsTo(Vehicle, { foreignKey: 'id_vehicle' })
//Vehicle_Tag.belongsTo(Tag, { foreignKey: 'id_tag' })