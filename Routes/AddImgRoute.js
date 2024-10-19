// const express = require('express');
// const router = express.Router();
// const app = express();
// const bodyParser = require('body-parser');

// // Increase body size limit to handle larger payloads
// app.use(bodyParser.json({ limit: '50mb' }));  // Set a larger limit, like 50MB
// const Post = require('../models/AddImg');
// router.post('/',async (req,res)=>{
//   try {
//    const data =  req.body;
//    const newPost =  new Post(data);
//    const response = await newPost.save();
//    console.log("data saved successfully");
//    res.status(200).json(response);
//   } catch (error) {
//    console.log(error);
//    res.status(500).json({error:'internal server error'});
//   }
// })

// module.exports = router;





const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const Post = require('../models/AddImg');
// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fieldSize: 50 * 1024 * 1024 }, // 50MB
});

// Increase body size limit to handle larger payloads
app.use(bodyParser.json({ limit: '50mb' }));

// Define the route to handle file uploads
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    // Save the file buffer (image) to the database
    const data = {
      image: req.file.buffer, // Store the image buffer
    };

    const newPost = new Post(data);
    await newPost.save();

    res.status(200).json({ message: 'Image uploaded successfully', postId: newPost._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
