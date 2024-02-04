const { Creator } = require("../models/creator");
const errorFunction = require("../utils/errorFunction");
const config = require('config')
const jwt = require('jsonwebtoken')


async function authUser(req, res, next) {
    try {
        const token = req.cookies ? req.cookies['cc-auth-token'] : null
        if(!token){
            res.status(401).send(errorFunction({
                isError : true,
                message : "Invalid credentials. Login again."
            }))
            return
        }
        const payload = jwt.verify(token,config.get('jwtSecret'))
        const creator = await Creator.findOne({_id : payload.creator_id}).exec()
        req.creator = creator
        next()

    } catch (err) {
        if (err.message.startsWith("Cast")) {
            res.status(404).send(errorFunction({
                isError: true,
                message: "No such user exists"
            }))
            return
        }
        res.status(500).send(errorFunction({
            isError: true,
            message: "Internal server error",
            errorDetail: err.message
        }))
    }
}

// async function authUser(req,res,next){
//     try {
//         console.log(req.body)
//         const creator_id = JSON.stringify(req.body)==="{}" ? req.params.creator_id : req.body.creator_id
//         const creator = await Creator.findOne({_id : creator_id}).exec()
//         req.creator = creator
//         next()

//     }catch(err){
//         if(err.message.startsWith("Cast")){
//             res.status(404).send(errorFunction({
//                 isError : true,
//                 message : "No such user exists"
//             }))
//             return
//         }
//         res.status(500).send(errorFunction({
//             isError : true,
//             message : "Internal server error",
//             errorDetail : err.message
//         }))
//     }
// }


module.exports = {
    authUser
}