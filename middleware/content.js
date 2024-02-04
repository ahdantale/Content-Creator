const errorFunction = require("../utils/errorFunction");
const { createContentRequestSchema, deleteContentRequestSchema, editContentRequestSchema } = require("../validators/contents");

function validateCreateContentRequest(req,res,next) {
    console.log(req.body)
    const validationResult = createContentRequestSchema.validate(req.body)
    if(validationResult.error){
        res.status(400).send(errorFunction({
            isError : true,
            message : "Bad request",
            errorDetail : validationResult.error.message
        }))
        return
    }
    next()
}

function validateDeleteContentRequest(req,res,next){
    const validationResult = deleteContentRequestSchema.validate(req.body)
    if(validationResult.error){
        res.status(400).send(errorFunction({
            isError : true,
            message : "Bad request",
            errorDetail : validationResult.error.message
        }))
        return
    }
    next()
}

function validateEditContentRequest(req,res,next){
    const validationResult = editContentRequestSchema.validate(req.body)
    if(validationResult.error){
        res.status(400).send(errorFunction({
            isError : true,
            message : "Bad request",
            errorDetail : validationResult.error.message
        }))
        return
    }
    next()
}

module.exports = {
    validateCreateContentRequest,
    validateDeleteContentRequest,
    validateEditContentRequest
}