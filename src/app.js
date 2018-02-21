// import { Promise } from 'mongoose';

const port = process.env.PORT || 8081
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
let mongoose = require('./db')
    // let mongoose = require('mongoose')
    // mongoose.Promise = global.Promise
const app = express()

var Post = require("./models/post");
Post = mongoose.model('Post')

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

app.post('/posts', (req, res) => {

    var title = req.body.title
    var description = req.body.description
    var author = req.body.author

    // let post = new Post({
    //     title,
    //     description,
    //     author
    // });

    Post.create(req.body)
        .then((post) => { res.json(post) })
        .catch((error) => {
            res.status(500).send('Error')
        })

    // post.save((error) => {
    //     if (error)
    //         console.log(error)

    //     res.json({
    //         success: true,
    //         message: 'Post saved successfully'
    //     })
    // })

})

app.get('/posts', (req, res) => {
    Post.find({})
        .then(posts => {
            res.json(posts)
        })
        .catch((error) => {
            res.send(error)
        });
})

app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch((error) => res.send(error))
})

app.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author, description: req.body.description }, { new: true })
        .then(post => res.json(post))
        .catch(err => res.send(err))
})

app.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.send(err))
})

//Database connection 
// var db = mongoose.connection;


// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function(callback) {
//     console.log("Connection Succeeded");
// });

app.listen(port, () => {
    console.log(`App run successfully to ${port}`)
})