let express = require('express');

let router = express.Router();
let Post = require("../models/post");

router.post('/', (req, res) => {


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

router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            res.json(posts)
        })
        .catch((error) => {
            res.send(error)
        });
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch((error) => res.send(error))
})

router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author, description: req.body.description }, { new: true })
        .then(post => res.json(post))
        .catch(err => res.send(err))
})

router.delete('/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.send(err))
})

module.exports = router;