const Joi = require('joi')


const registerCreatorRequestSchema = Joi.object({
    username : Joi.string().min(5).max(20).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(8).max(50).required()
})

const loginCreatorRequestSchema = Joi.object({
    username : Joi.string().min(5).max(20).required(),
    password : Joi.string().min(8).max(50).required()
})

module.exports = {
    registerCreatorRequestSchema,
    loginCreatorRequestSchema
}