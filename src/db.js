    //setup database connection

    let mongoose = require('mongoose');
    mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://localhost:27017/posts')
        .then(() => {
            console.log("Connection Succeeded");
        }).catch((error) => {
            console.log(error)
        })

    module.exports = mongoose;


    // module.exports = mongoose;