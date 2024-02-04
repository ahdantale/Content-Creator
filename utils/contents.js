const { Content } = require("../models/content")
const errorFunction = require("./errorFunction")
const _ = require('lodash')

function generatePublishURL(username){
    return `${username}_${Date.now()}`
}

async function insertContentInDB({creator,title, description,links}){
    try {

        const content = new Content({
            title : title,
            description : description,
            publish_url : generatePublishURL(creator.username),
            links : links
        })

        await content.save()
        creator.content_ids.push(content._id)
        await creator.save()
        return errorFunction({
            isError : false,
            message : "content created succesefully"
        })

    }catch(err){
        throw err
    }
}

async function deleteContent({creator,content_id}){
    try{
        const content = await Content.deleteOne({_id : content_id}).exec()
        creator.content_ids = creator.content_ids.filter((val)=>val!=content_id)
        await creator.save()
        if(content.deletedCount >= 1){
            return errorFunction({
                isError : false,
                message : "Deletion successfull"
            })
        }
        return errorFunction({
            isError : true,
            message : "Nothing deleted"
        })

    }catch(err){
        if(err.message.startsWith("Cast")){
            return errorFunction({
                isError : true,
                message : "No content with this id."
            })
        }
        throw err
    }
}

async function getContentsForCreator(creator){
    try {
        if(creator.content_ids.length === 0){
            return errorFunction({
                isError : false,
                message : "No content for this creator.",
                data : {
                    contents : [

                    ]
                }
            })
        }
        const contents = await Content.find({_id : {$in : creator.content_ids}}).exec()
        return errorFunction({
            isError : false,
            data : {
                contents : contents
            }
        })
    }catch(err){
        throw err
    }
}

module.exports = {
    generatePublishURL,
    deleteContent,
    getContentsForCreator
}