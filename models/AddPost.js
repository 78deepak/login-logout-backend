// const { required } = require('joi');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const postSchema = new Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     note:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     }
// })


// const  AddPostModel = mongoose.model('AddPostModel', postSchema);
// module.exports = AddPostModel;

// // models/AddPost.js



const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String
    }
})


const  AddPostModel = mongoose.model('AddPostModel', postSchema);
module.exports = AddPostModel;

// models/AddPost.js

