const { generatePublishURL } = require('../utils/contents')
const { Content } = require("../models/content")
const errorFunction = require("../utils/errorFunction")
const _ = require('lodash')


async function createContent(req, res, next) {
    try {

        const content = new Content({
            title: req.body.title,
            description: req.body.description,
            publish_url: generatePublishURL(req.creator.username),
            ...(req.body.links) && ({ links: req.body.links })
        })

        await content.save()
        req.creator.content_ids.push(content._id)
        await req.creator.save()
        res.status(200).send(errorFunction({
            isError: false,
            message: "content created succesefully"
        }))

    } catch (err) {
        res.status(500).send(errorFunction({
            isError: true,
            message: "Internal server error",
            errorDetail: err.message
        }))
    }
}

async function deleteContent(req, res, next) {
    try {
        const content = await Content.deleteOne({ _id: req.body.content_id }).exec()
        req.creator.content_ids = req.creator.content_ids.filter((val) => val != req.body.content_id)
        await req.creator.save()
        if (content.deletedCount >= 1) {
            res.status(200).send(errorFunction({
                isError: false,
                message: "Deletion successfull"
            }))
            return
        }
        res.status(404).send(errorFunction({
            isError: true,
            message: "Nothing deleted"
        }))
        return
    } catch (err) {
        res.status(500).send(errorFunction({
            isError: true,
            message: "Internal server error",
            errorDetail: err.message
        }))
    }
}

async function getContentsForCreator(req, res, next) {
    try {
        if (req.creator.content_ids.length === 0) {
            res.status(200).send(errorFunction({
                isError: false,
                message: "No content for this creator.",
                data: {
                    contents: [

                    ]
                }
            }))
            return
        }
        const contents = await Content.find({ _id: { $in: req.creator.content_ids } }).exec()
        res.status(200).send(errorFunction({
            isError: false,
            data: {
                contents: contents
            }
        }))
        return
    } catch (err) {
        if (err.message.startsWith("Cast")) {
            res.status(404).send(errorFunction({
                isError: true,
                message: "No contents with these ids."
            }))
            return
        }
        res.status(500).send(errorFunction({
            isError: true,
            message: "Internal server error.",
            errorDetail: err.message
        }))
    }
}

async function putContent(req, res, next) {
    try {

        const content = await Content.findOne({ _id: req.body.content_id }).exec()
        content.title = req.body.title
        content.description = req.body.description
        content.links = req.body.links
        await content.save()
        res.status(200).send(errorFunction({
            isError: false,
            message: "Content updated successfully"
        }))
    } catch (err) {
        if(err.message.startsWith("Cast")){
            res.status(404).send(errorFunction({
                isError: true,
                message: "No content with this id."
            }))
            return
        }
        res.status(500).send(errorFunction({
            isError: true,
            message: "Internal server error.",
            errorDetail: err.message
        }))
    }
}

async function getContentToPublish(req,res,next){
    try{

        const content = await Content.findOne({publish_url : req.params.publish_url}).exec()
        if(!content) {
            res.status(404).send(errorFunction({
                isError : true,
                message : "No content for this url."
            }))
            return
        }
        res.status(200).send(errorFunction({
            isError : false,
            message : "Content found",
            data : {
                content : _.pick(content,["title","description","links"])
            }
        }))

    }catch(err){
        res.status(500).send(errorFunction({
            isError : true,
            message : "Internal server error.",
            errorDetail : err.message
        }))
    }
}

module.exports = {
    createContent,
    deleteContent,
    getContentsForCreator,
    putContent,
    getContentToPublish
}