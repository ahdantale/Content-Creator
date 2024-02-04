const errorFunction = require('../utils/errorFunction')
const {registerCreatorRequestSchema, loginCreatorRequestSchema} = require('../validators/creators')

function validateRegisterCreatorRequest(req,res,next) {
    const validationResult = registerCreatorRequestSchema.validate(req.body)
    if(validationResult.error){
        res.status(400).send(errorFunction({
            isError:true,
            message : "Bad request",
            errorDetail : validationResult.error.message
        }))
        return
    }
    next()
}

function validateLoginCreatorRequest(req,res,next){
    const validationResult = loginCreatorRequestSchema.validate(req.body)
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
    validateRegisterCreatorRequest,
    validateLoginCreatorRequest
}