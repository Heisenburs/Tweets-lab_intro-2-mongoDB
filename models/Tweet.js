//! SCHEMA

const mongoose = require('mongoose')

//TODO: create Schema
const tweetSchema = new mongoose.Schema({
    title: String,
    body: {
        type: String,
        minLength: 1,
        maxLength: 250 
    },
    author: String,
    category: {
        type: String,
        enum: ['Programming', 'Gaming', 'Editing']
    },
    likes: {
        type: Number,
        default: 0
    },
    sponsored: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true}

)

//TODO: create Model
const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet;