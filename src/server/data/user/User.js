import { Router } from "express"
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./User.service"
import { validateId, validateUser } from "./User.validate"
import { StatusError, ValidateError } from "../../core/util/error"

/** @type {Router} */
export const routeUser = Router()

/**
 * @typedef User
 * 
 * @property {number} [id] -
 * @property {string} login -
 * @property {string} senha -
 * @property {string} nome -
 * @property {string} email -
 * @property {number} anoNascimento -
 */

/**
 * CreateUser
 */
routeUser.post("/", async (req, res) => {
    /** @type {User} */
    const body = req.body

    /** @type {User} */
    const data = {
        nome: body.nome,
        senha: body.senha,
        email: body.email,
        login: body.login,
        anoNascimento: Number(body.anoNascimento)
    }

    /** @type{User} */
    let user

    try {
        user = validateUser(data, false)
    } catch (err) {
        /** @type {ValidateError} */
        let validaError = err instanceof ValidateError ? err : new ValidateError("unknown", "unknown")

        res.status(400).send(`Error: ${validaError.field}`)

        return
    }

    //
    try {
        await createUser(user)
    } catch (err) {
        /** @type {StatusError} */
        let statusError = err instanceof StatusError ? err : new StatusError("", 500)

        res.status(statusError.code).send("")

        return
    }

    //
    res.send("")
})

/**
 * GetAll
 */
routeUser.get("/", async (req, res) => {
    /** @type {User[]} */
    let users

    try {
        users = await getUsers()
    } catch (err) {
        /** @type {ValidateError} */
        let validaError = err instanceof ValidateError ? err : new ValidateError("unknown", "unknown")

        res.status(400).send(`Error: ${validaError.field}`)

        return
    }

    //
    res.send(users)
})

/**
 * GetOne
 */
routeUser.get("/:id", async (req, res) => {
    /** @type {number} */
    let id = Number(req.params.id)

    try {
        id = validateId(id)
    } catch (err) {
        /** @type {ValidateError} */
        let validaError = err instanceof ValidateError ? err : new ValidateError("unknown", "unknown")

        res.status(400).send(`Error: ${validaError.field}`)

        return
    }

    /** @type{User} */
    let user

    try {
        user = await getUser(id)
    } catch (err) {
        /** @type {ValidateError} */
        let validaError = err instanceof ValidateError ? err : new ValidateError("unknown", "unknown")

        res.status(400).send(`Error: ${validaError.field}`)

        return
    }

    //
    res.send(user)
})

/**
 * UpdateUser
 */
routeUser.put("/", async (req, res) => {
    /** @type {User} */
    const body = req.body

    /** @type {User} */
    const data = {
        id: Number(body.id),
        nome: body.nome,
        senha: body.senha,
        email: body.email,
        login: body.login,
        anoNascimento: Number(body.anoNascimento)
    }

    /** @type{User} */
    let user

    try {
        user = validateUser(data, true)
    } catch (err) {
        /** @type {ValidateError} */
        let validaError = err instanceof ValidateError ? err : new ValidateError("unknown", "unknown")

        res.status(400).send(`Error: ${validaError.field}`)

        return
    }

    //
    try {
        await updateUser(user)
    } catch (err) {
        /** @type {StatusError} */
        let statusError = err instanceof StatusError ? err : new StatusError("", 500)

        res.status(statusError.code).send("")

        return
    }

    //
    res.send("")
})

/**
 * DeleteUser
 */
routeUser.delete("/:id", async (req, res) => {
    /** @type {number} */
    const id = Number(req.params.id)

    try {
        validateId(id)
    } catch (err) {
        /** @type {StatusError} */
        let statusError = err instanceof StatusError ? err : new StatusError("", 500)

        res.status(statusError.code).send("")

        return
    }

    //
    await deleteUser(id)

    //
    res.send("")
})