import { ValidateError } from "../../core/util/error"

/**
 * validateUser
 * 
 * @param {import("./User").User} user 
 * @param {boolean} hasId
 * @returns {import("./User").User} 
 */
export const validateUser = (user, hasId) => {
    /** @type {import("./User").User} */
    let tempUser = user

    /** @type {ValidateError | undefined} */
    let validateError

    //
    try {
        tempUser.id = hasId ? validateId(Number(tempUser.id)) : 0 

        //
        tempUser.login = validateLogin(tempUser.login)
        tempUser.nome = validateNome(tempUser.nome)
        tempUser.senha = validateSenha(tempUser.senha)
        tempUser.anoNascimento = validateAnoNascimento(Number(tempUser.anoNascimento))
        tempUser.email = validateEmail(tempUser.email)
    } catch (err) {
        validateError = err instanceof ValidateError ? err : new ValidateError("unknown", "unknown")
    }

    if (validateError !== undefined) throw validateError

    return tempUser
}

/**
 * validateId
 * 
 * @param {number} id 
 * @returns {number}
 */
export const validateId = (id) => {
    /** @type {number} */
    let tempId = id

    //
    if (tempId === null) throw new ValidateError("null", "id")
    if (tempId === undefined) throw new ValidateError("undefined", "id")
    // NaN is a number?????
    if (typeof(tempId) !== "number" || isNaN(tempId) ||  tempId <= 0) throw new ValidateError("invalid", "id")

    //
    return tempId
}

/**
 * validateLogin
 * 
 * @param {string} login
 * @returns {string} 
 */
const validateLogin = (login) => {
    /** @type {string} */
    let tempLogin = login

    //
    if (tempLogin === null) throw new ValidateError("null", "login")
    if (tempLogin === undefined) throw new ValidateError("undefined", "login")
    if (tempLogin.length < 5) throw new ValidateError("length", "login")

    //
    return tempLogin
}

/**
 * validateNome
 * 
 * @param {string} nome
 * @returns {string} 
 */
const validateNome = (nome) => {
    /** @type {string} */
    let tempNome = nome

    //
    if (tempNome === null) throw new ValidateError("null", "nome")
    if (tempNome === undefined) throw new ValidateError("undefined", "nome")
    if (tempNome.length < 5) throw new ValidateError("length", "nome")

    //
    return tempNome
}

/**
 * validateSenha
 * 
 * @param {string} senha 
 * @returns {string}
 */
const validateSenha = (senha) => {
    /** @type {string} */
    let tempSenha = senha

    //
    if (tempSenha === null) throw new ValidateError("null", "senha")
    if (tempSenha === undefined) throw new ValidateError("undefined", "senha")
    if (tempSenha.length < 8) throw new ValidateError("length", "senha")

    //
    return tempSenha
}

/**
 * validateAnoNascimento
 * 
 * @param {number} anoNascimento 
 * @returns {number}
 */
const validateAnoNascimento = (anoNascimento) => {
    /** @type {number} */
    let tempAnoNascimento = anoNascimento

    //
    if (tempAnoNascimento === null) throw new ValidateError("null", "anoNascimento")
    if (tempAnoNascimento === undefined) throw new ValidateError("undefined", "anoNascimento")
    if (tempAnoNascimento < 1900 || tempAnoNascimento > 2020) throw new ValidateError("invalid", "anoNascimento")

    //
    return tempAnoNascimento
}

/**
 * validateEmail
 * 
 * @param {string} email 
 * @returns {string}
 */
const validateEmail = (email) => {
    /** @type {string} */
    let tempEmail = email
    
    /** @type {RegExp} */
    var regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    //
    if (tempEmail === null) throw new ValidateError("null", "email")
    if (tempEmail === undefined) throw new ValidateError("undefined", "email")
    if (!regx.test(email)) throw new ValidateError("invalid", "email")

    //
    return tempEmail
}