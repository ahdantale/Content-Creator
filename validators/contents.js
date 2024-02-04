const Joi = require('joi')


const createContentRequestSchema = Joi.object({
    title : Joi.string().min(5).max(50).required(),
    description : Joi.string().min(5).required(),
    links : Joi.array().items(Joi.string())
})

const deleteContentRequestSchema = Joi.object({
    content_id : Joi.string().required()
})

const editContentRequestSchema = Joi.object({
    content_id : Joi.string().required(),
    title : Joi.string().min(5).max(50).required(),
    description : Joi.string().min(5).required(),
    links : Joi.array().items(Joi.string())
})

module.exports = {
    createContentRequestSchema,
    deleteContentRequestSchema,
    editContentRequestSchema
}