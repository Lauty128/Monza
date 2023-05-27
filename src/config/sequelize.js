//---- Dependencies
import { Sequelize } from "sequelize"

//---- Config
    import { db_name, db_user, db_password, db_host, db_url, environment } from './env.js'

    
//---- Config of database
    export const sequelize = (environment === "dev") 
        ? new Sequelize(db_name, db_user, db_password,{
            host:db_host,
            dialect:'mysql'
        }) 
        : new Sequelize(db_url)