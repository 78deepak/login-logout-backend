const express = require('express');
const router = express.Router();
const app = express()
const bodyParser = require('body-parser');
const addpostmodels = require('../models/AddPost')
app.use(bodyParser.json({ limit: '100mb' }));  

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


  router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;  // Get the post ID from the URL parameter
      const response = await addpostmodels.findByIdAndDelete(postId);  // Use findByIdAndDelete instead of findByIdAndRemove
  
      if (!response) {
        return res.status(404).json({ error: 'Post not found' });  // If post does not exist
      }
  
      res.status(200).json({ message: 'Post Deleted Successfully' });  // Successful deletion response
    } catch (error) {
      console.error(error);  // Log any errors to the console
      res.status(500).json({ error: 'Internal Server Error' });  // Handle server errors
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
