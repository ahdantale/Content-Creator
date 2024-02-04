const mongoose = require("mongoose")
const Joi = require('joi')

const Content = new mongoose.model('contents',new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 5,
        maxLength : 50
    },
    description : {
        type : String, 
        required : true,
        minLength : 5
    },
    links : {
        type : [String]
    },
    document_id : {
        type : mongoose.Types.ObjectId
    },
    publish_url : {
        type : String,
        required : true
    }

}))


module.exports = {
    Content
}