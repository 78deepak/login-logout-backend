const express = require('express');
const router = express.Router();
const app = express()
const bodyParser = require('body-parser');
const addpostmodels = require('../models/AddPost')
const dotenv = require("dotenv").config()
app.use(bodyParser.json({ limit: '100mb' }));  

const cloudinary = require('cloudinary').v2;
cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Post = require('../models/AddPost');
router.post('/',async (req,res)=>{
    try {
     const data =  req.body;
     const newPost =  new Post(data);
     const response = await newPost.save();
     console.log("data saved successfully");
     res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(500).json({error:'internal server error'});
    }
  })



  // router.delete('/:id', async(req,res)=>{
  //   try {
  //     const personId = req.params.id;
  //     const response = await Post.findByIdAndRemove(personId);

  //     if(!response){
  //       return res.status(404).json({error:'Post not found'});
  //     }
  //     console.log('data delete');
  //     res.status(200).json({message:'Post Deleted Successfully'});
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({error:'Internal Server Error'});
  //   }
  // })


  router.delete('/', async (req, res, next) => {
  try {
    const imageUrl = req.query.imageUrl; // Get the image URL from the query params
    const postId = req.query.id; // Get the post ID from the query params
    
    if (!imageUrl || !postId) {
      return res.status(400).json({ error: 'Missing imageUrl or postId in the request' });
    }

    // Extract the full path (folder + image name) for Cloudinary deletion
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageNameWithFolder = urlArray.slice(urlArray.length - 2).join('/').split('.')[0]; // Extract full path excluding extension

    console.log('Image URL:', imageUrl);
    console.log('Full path for Cloudinary deletion:', imageNameWithFolder);

    // Delete the post from MongoDB
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the image from Cloudinary
    cloudinary.uploader.destroy(imageNameWithFolder, (error, result) => {
      if (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return res.status(500).json({ error: 'Cloudinary deletion failed' });
      }

      if (result.result === 'not found') {
        return res.status(404).json({ message: 'Image not found on Cloudinary' });
      }

      console.log('Image deleted from Cloudinary:', result);

      // Send a successful response
      res.status(200).json({
        message: 'Post and associated image deleted successfully',
        cloudinaryResult: result
      });
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




  router.put('/:id', async(req,res)=>{
    try {
      const personId = req.params.id;
      const updatePersonData = req.body;
      const response = await Post.findByIdAndUpdate(personId,updatePersonData,{new:true,runValidators:true});

      if(!response){
        return res.status(404).json({error:'Person not found'});

      }

      console.log('data updated');
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'});
    }
  })
  

 module.exports = router;
