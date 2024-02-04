const { Creator } = require('../models/creator')
const { creatSecurePassword } = require('./auth')
const errorFunction = require('./errorFunction')
const _ = require('lodash')


async function fetchCreatorFromDB(username) {
    try {

        const creator = await Creator.findOne({username : username}).exec()
        return creator

    }catch(err){
        throw err
    }
}

module.exports = {
    fetchCreatorFromDB
}