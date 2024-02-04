const express = require('express')
const config = require('config')
const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).send({
        success : true,
        message : "Server is live. You can connect"
    })
})

module.exports = router