const { Sequelize } = require("sequelize")
const colors = require("colors")

const database = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST

const db = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql",
        logging: false
    }
)

const dbConnectMySql = async () => {
    try {
        await db.authenticate()
            console.log("MySQL conexión correcta".green)

        // drop all tables
        await db.sync({force:true})
    }
    catch(err) {
            console.log("MySQL error de conexión:".red + err.message.brightRed)
    }
}

module.exports = {db, dbConnectMySql}
