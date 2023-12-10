/**
 * ValidateError
 * 
 * @class ValidateError
 */
export class ValidateError extends Error {
    /**
     * constructor
     * 
     * @param {string} message 
     * @param {string} field 
     */
    constructor(message, field){
        super(message)

        // InstanceOf funcionar
        Object.setPrototypeOf(this, ValidateError.prototype);

        this.field = field

        this.name = "ValidateError"
    }
}

/**
 * StatusError
 * 
 * @class StatusError
 */
export class StatusError extends Error {
    /**
     * constructor
     * 
     * @param {string} message 
     * @param {number} code 
     */
    constructor(message, code){
        super(message)

        // InstanceOf funcionar
        Object.setPrototypeOf(this, StatusError.prototype);

        this.code = code

        this.name = "StatusError"
    }
}