const { Sequelize } = require("sequelize")

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
            console.log("MySQL conexión correcta")

        // drop all tables
        await db.sync({force:true})
    }
    catch(err) {
            console.log("MySQL error de conexión:", err)
    }
}

module.exports = {db, dbConnectMySql}
