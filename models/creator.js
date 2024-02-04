const mongoose = require('mongoose')
const Joi = require('joi')


const Creator = new mongoose.model('Creator',new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minLength : 5,
        maxLength : 20,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    content_ids : {
        type : [mongoose.Types.ObjectId]
    }
}))


module.exports = {
    Creator
}