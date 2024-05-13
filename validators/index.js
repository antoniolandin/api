const loginValidator = require('./login')
const registerUserValidator = require('./register')
const registerCommerceValidator = require('./register-commerce')
const updateCommerceValidator = require('./update-commerce')

module.exports = {
    loginValidator,
    registerUserValidator,
    registerCommerceValidator,
    updateCommerceValidator
}
