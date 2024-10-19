const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddImg = new Schema({
    image: Buffer
},
{
    collection:"ImageDetails",
}
);


const  AddImgModel = mongoose.model('AddImgModel', AddImg);
module.exports = AddImgModel;

// models/AddPost.js

