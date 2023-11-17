import { Sequelize } from "sequelize";


const db = new Sequelize('capstone','root','@Sarung123',{
    host: 'localhost',
    dialect: 'mysql',
})

export default db;