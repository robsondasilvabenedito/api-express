import { SqlError } from "mariadb"
import Pool from "../../core/config/database"
import { StatusError } from "../../core/util/error"

const USER_TABLE = process.env.TABLE_USER

//
const USER_ID = process.env.TABLE_USER_ID
const USER_NAME = process.env.TABLE_USER_NAME
const USER_PASSWORD = process.env.TABLE_USER_PASSWORD
const USER_LOGIN = process.env.TABLE_USER_LOGIN
const USER_EMAIL = process.env.TABLE_USER_EMAIL
const USER_YEAR = process.env.TABLE_USER_YEAR

/**
 * createUser
 * 
 * @param {import("./User").User} user
 */
export const createUser = async (user) => {
    /** @type {string} */
    const sql = `INSERT INTO ${USER_TABLE} (${USER_NAME}, ${USER_PASSWORD}, ${USER_LOGIN}, ${USER_EMAIL}, ${USER_YEAR}) VALUE (?, ?, ?, ?, ?)`

    /** @type {any} */
    let result

    /** @type {StatusError | undefined} */
    let statusError

    //
    try {
        result = await Pool.query(sql, [user.nome, user.senha, user.login, user.email, user.anoNascimento])
    } catch (err) {
        /** @type {SqlError} */
        let sqlError = err instanceof SqlError ? err : new SqlError("")

        switch (sqlError.code) {
            case "ER_DUP_ENTRY":
                statusError = new StatusError("", 409)
                break;
            default:
                statusError = new StatusError("", 500)
                console.log(sqlError)
                break;
        }
    }

    //
    if (statusError !== undefined) throw statusError
}

/**
 * updateUser
 * 
 * @param {import("./User").User} user 
 */
export const updateUser = async (user) => {
    /** @type {string} */
    const sql = `UPDATE ${USER_TABLE} SET ${USER_NAME} = ?, ${USER_PASSWORD} = ?, ${USER_LOGIN} = ?, ${USER_EMAIL} = ?, ${USER_YEAR} = ? WHERE ${USER_ID} = ?`

    /** @type {any} */
    let result

    /** @type {StatusError | undefined} */
    let statusError

    //
    try {
        result = await Pool.query(sql, [user.nome, user.senha, user.login, user.email, user.anoNascimento, user.id])

        if (result.affectedRows === 0) {
            statusError = new StatusError("", 410)
        }
    } catch (err) {
        /** @type {SqlError} */
        let sqlError = err instanceof SqlError ? err : new SqlError("")

        switch (sqlError.code) {
            case "ER_DUP_ENTRY":
                statusError = new StatusError("", 409)
                break;
            default:
                statusError = new StatusError("", 500)
                console.log(sqlError)
                break;
        }
    }

    //
    if (statusError !== undefined) throw statusError
}

/**
 * getUsers
 * 
 * @returns {Promise<import("./User").User[]>}
 */
export const getUsers = async () => {
    /** @type {string} */
    const sql = `SELECT * FROM ${USER_TABLE}`

    /** @type {any} */
    let result

    /** @type {StatusError | undefined} */
    let statusError

    //
    try {
        result = await Pool.query(sql)
    } catch (err) {
        /** @type {SqlError} */
        let sqlError = err instanceof SqlError ? err : new SqlError("")

        switch (sqlError.code) {
            default:
                statusError = new StatusError("", 500)
                console.log(sqlError)
                break;
        }
    }

    //
    if (statusError !== undefined) throw statusError

    //
    return result
}

/**
 * getUser
 * 
 * @param {number} id 
 * @returns {Promise<import("./User").User>}
 */
export const getUser = async (id) => {
    /** @type {string} */
    const sql = `SELECT * FROM ${USER_TABLE} WHERE ${USER_ID} = ?`

    /** @type {any} */
    let result

    /** @type {StatusError | undefined} */
    let statusError

    //
    try {
        result = await Pool.query(sql, [id])
    } catch (err) {
        /** @type {SqlError} */
        let sqlError = err instanceof SqlError ? err : new SqlError("")

        switch (sqlError.code) {
            default:
                statusError = new StatusError("", 500)
                console.log(sqlError)
                break;
        }
    }

    //
    if (statusError !== undefined) throw statusError

    //
    return result
}

/**
 * deleteUser
 * 
 * @param {number} id 
 */
export const deleteUser = async (id) => {
    /** @type {string} */
    let sql = `DELETE FROM ${USER_TABLE} WHERE ${USER_ID} = ?`

    /** @type {any} */
    let result

    /** @type {StatusError | undefined} */
    let statusError

    //
    try {
        result = await Pool.query(sql, [id])
    } catch (err) {
        /** @type {SqlError} */
        let sqlError = err instanceof SqlError ? err : new SqlError("")

        switch (sqlError.code) {
            default:
                statusError = new StatusError("", 500)
                console.log(sqlError)
                break;
        }
    }

    //
    if (statusError !== undefined) throw statusError
}