import * as mariadb from "mariadb"

/**
 * Pool default do Mariadb
 */
const Pool =  mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    decimalAsNumber: true,
    dateStrings: true,
    bigIntAsNumber: true
})

//
export default Pool