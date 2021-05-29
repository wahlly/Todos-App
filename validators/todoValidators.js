const validator = require('validator');

// description cannot be empty. We dont want only numbers. we dont want boolean - Product manager
module.exports = class TodoValidator{

    static async todoCreation(description) {
        
        let error = {}
        if(validator.isEmpty(description)) {
            error.description = 'sorry, description cannot be empty'
        }
        if(validator.isNumeric(description, { no_symbols: true } )) {
            error.description = 'sorry, just digits and symbols cannot be taken as description'
        }
        if(validator.isBoolean(description)) {
            error.description = 'sorry, value of description cannot be a Boolean'
        }

        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }

    static async retrieveTodoById(paramsId) {

        let error = {}

        if(validator.isAlphanumeric(paramsId)) {
            error.message = 'id should not only contain alphabets and numbers only!'
        }
        if(validator.isNumeric(paramsId)) {
            error.message = 'id cannot be numbers only'
        }
        if(validator.isAlpha(paramsId)) {
            error.message = 'id cannot contain only alphabets'
        }

        return {
            error,
            isValid: Object.keys(error).length == 0
        }
    }
}