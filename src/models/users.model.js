//-------- dependencies
import { sequelize } from '../config/sequelize.js';
import { DataTypes } from "sequelize";

//---- Utils
import { createPassword } from '../utils/table.util.js'

//---- Models
import { Vehicle } from './vehicles.model.js';


export const User = sequelize.define('user',{
    id_user:{
        type: DataTypes.STRING(5),
        defaultValue: createPassword(5),
        primaryKey:true
    },
    name: DataTypes.STRING(15),
    subname: DataTypes.STRING(15),
    image:{
        type:DataTypes.STRING,
        defaultValue: null
    },
    city: DataTypes.STRING(20),
    phone: DataTypes.STRING(20),
    rol: DataTypes.STRING(10),
    user: DataTypes.STRING(15),
    password: DataTypes.STRING(20),
})

//----------- Relations
User.hasMany(Vehicle)
Vehicle.belongsTo(User)
