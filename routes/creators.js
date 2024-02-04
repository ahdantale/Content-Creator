const express = require('express')
const config = require('config')
const { validateRegisterCreatorRequest, validateLoginCreatorRequest } = require('../middleware/creators')
const _ = require('lodash')
const {registerCreatorInDB, loginCreator, logoutCreator, getCreator} = require('../controllers/creators')
const {authUser} = require('../middleware/auth')

const router = express.Router()

const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.post('/register',validateRegisterCreatorRequest,registerCreatorInDB)

router.post('/login',validateLoginCreatorRequest,loginCreator)

router.get('/me',authUser,getCreator)

router.post('/logout',authUser,logoutCreator)

module.exports = router
