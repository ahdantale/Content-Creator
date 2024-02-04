const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const testing = require('./routes/test')
const creators = require('./routes/creators')
const contents = require('./routes/contents')
const morgan = require('morgan')
const cors = require("cors")

mongoose.connect(config.get('db'))
    .then(()=>{console.log(`Successfully connected to mongodb with URL ${config.get('db')}`)})
    .catch((err)=>{console.log(`ERR Database connection failed.===>${err}`)})

const app = express()

app.use(morgan('dev'))
app.use(cors({
    origin : ["http://localhost:3000","http://localhost:3001"],
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded())


app.use('/api/testing',testing)
app.use('/api/creators',creators)
app.use('/api/contents',contents)

const port = process.env.PORT || 6060
app.listen(port,()=>console.log(`Connected on port number ${port}`))