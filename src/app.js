// import { Promise } from 'mongoose';

const port = process.env.PORT || 8081
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
let mongoose = require('./db')
let router = require('./routes/index')
    // let mongoose = require('mongoose')
    // mongoose.Promise = global.Promise
const app = express()


app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use('/posts', router);



app.listen(port, () => {
    console.log(`App run successfully to ${port}`)
})