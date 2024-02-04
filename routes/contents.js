const express = require('express')
const errorFunction = require('../utils/errorFunction')
const { validateCreateContentRequest, validateEditContentRequest } = require('../middleware/content')
const { authUser } = require('../middleware/auth')
const multer = require('multer')
const { createContent, deleteContent,getContentsForCreator, putContent, getContentToPublish } = require('../controllers/contents')
const upload = multer({})
const router = express.Router()
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.post('/create',upload.single('test'),validateCreateContentRequest,authUser,createContent)

router.delete('/',authUser,deleteContent)

router.get('/for_user',authUser,getContentsForCreator)

router.put('/edit',upload.single('test'),validateEditContentRequest,authUser,putContent)

router.get('/:publish_url',getContentToPublish)

module.exports = router