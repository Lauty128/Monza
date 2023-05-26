//-------- dependencies
import { sequelize } from '../config/sequelize.js';
import { DataTypes } from "sequelize";

//---- Utils
import { createPassword } from '../utils/table.util.js'


export const Vehicle = sequelize.define('vehicle',{
    id_vehicle:{
        type: DataTypes.STRING(22),
        defaultValue: createPassword(22),
        primaryKey: true
    },
    version: DataTypes.STRING(30),
    engine: DataTypes.STRING(10),
    fuel: DataTypes.STRING(10),
    model: DataTypes.INTEGER(4),
    image: DataTypes.TEXT,
    extra_images: DataTypes.TEXT,
    price: DataTypes.INTEGER(8),
    type: DataTypes.STRING(30),
    traction: DataTypes.STRING(30),
    km: DataTypes.INTEGER(6),
    color: DataTypes.STRING(30),
    transmission: DataTypes.STRING(30),
    offer_price: DataTypes.INTEGER(8)
})

export const Mark = sequelize.define('mark', {
    id_mark:{
        type:DataTypes.INTEGER(2),
        autoIncrement:true,
        primaryKey: true
    },
    name: DataTypes.STRING(20)
})

Mark.hasMany(Vehicle)
Vehicle.belongsTo(Mark)