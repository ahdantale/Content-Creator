const errorFunction = require("../utils/errorFunction")
const { Creator } = require('../models/creator')
const { creatSecurePassword, validatePassowrd } = require('../utils/auth')
const { fetchCreatorFromDB } = require('../utils/creators')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('config')

async function registerCreatorInDB(req,res,next){
    try {
        if(await Creator.findOne({email : req.body.email}).exec() || await Creator.findOne({username : req.body.username}).exec()){
            res.status(409).send(errorFunction({
                isError : true,
                message : "User already exits with this email id or the same username."
            }))
            return 
        } else {
            const hashedPassword = await creatSecurePassword(req.body.password)
            const creator = new Creator({
                username : req.body.username,
                email : req.body.email,
                password : hashedPassword
            })
            await creator.save()
            res.status(200).send(errorFunction({
                isError : false,
                message : "User created successfully",
                data : _.pick(creator.toObject(),["username","email"])
            }))
            return 
        }
    }catch(err){
        res.status(500).send(errorFunction({
            isError : true,
            message : "internal server error",
            errorDetail : `${err.message}`
        }))
    }
}

async function loginCreator(req,res){
    try {
        const creator = await fetchCreatorFromDB(req.body.username)
        if (!creator){
            res.status(404).send(errorFunction({
                isError : true,
                message : "User with this username doesn't exists."
            }))
            return
        }
        const isPasswordValid = await validatePassowrd(req.body.password,creator.password)
        if(isPasswordValid === false){
            res.status(401).send(errorFunction({
                isError : true,
                message :"Wrong password"
            }))
            return
        }

        const token = jwt.sign({creator_id:creator._id},config.get('jwtSecret'),{expiresIn : "5hr"})
        res
        .cookie("cc-auth-token",token,{
            expires : new Date(Date.now() + 5 * 3600000),
            secure : true,
            sameSite : "none",
            httpOnly : true
        })
        .status(200)
        .send(errorFunction({
            isError : false,
            message : "User logged in.",
            data : {
                creator : _.pick(creator,["username","email","_id"])
            }
        }))
    }catch(err){
        console.log(err)
        res.status(500).send(errorFunction({
            isError : true,
            message : "Internal Server Error",
            errorDetail : err.message
        }))
    }
}

async function logoutCreator(req,res){
    try {
        res.clearCookie('cc-auth-token',{
            secure : true,
            sameSite : "none",
            httpOnly : true
        }).status(200).send()
    }catch(err){
        console.log(err)
        res.status(500).send(errorFunction({
            isError : true,
            message : "Internal Server Error",
            errorDetail : err.message
        }))
    }
}

async function getCreator(req,res){
    try {
        res.status(200).send(errorFunction({
            isError : false,
            data : {
                creator : _.pick(req.creator.toObject,["username","content_ids","email"])
            }
        }))
        return
    }catch(err){
        console.log(err)
        res.status(500).send(errorFunction({
            isError : true,
            message : "Internal Server Error",
            errorDetail : err.message
        }))
    }
}

module.exports = {
    registerCreatorInDB,
    loginCreator,
    logoutCreator,
    getCreator
}