
const mongoose = require('mongoose');
// const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`
const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`



// console.log({user: process.env.MONGO_USERNAME,pwd:process.env.MONGO_PASSWORD,roles:["root"]})

mongoose.connect(uri)
    .then(() => console.log('Database: \x1b[32m%s\x1b[0m', 'connected'))
    .catch((err) => {
        console.error('\x1b[31m%s\x1b[0m', 'Error creating connection with db')
    }); 