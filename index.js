const express = require('express')
const app = express()
require('./models/db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());  
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const model = require('./models/User')
const ProductRouter = require('./Routes/ProductRouter')
const AddPostRouter = require('./Routes/AddPostRouter')
const AddPost = require('./models/AddPost')
const Post = require('./models/AddPost')
const dotenv = require("dotenv").config()
const AddImgRoute = require('./Routes/AddImgRoute')
const AddImg = require('./models/AddImg');
app.get('/', function (req, res) {
  res.send('Hello World my name is deepak')
  console.log("server started at port number  3000");
});

const PORT = process.env.PORT || 8080



app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.use('/addPost', AddPostRouter);
app.use('/upload-img',AddImgRoute);



app.get('/Allpost', async (req, res) => {
  const email = req.query.email;
  try {
    const data = await AddPost.find({ email: email });
    const postCount = await AddPost.countDocuments({ email: email });
    console.log("Data fetched");

    // Send both data and postCount in an object
    res.status(200).json({ posts: data, postCount: postCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// app.listen(process.env.PORT);
app.listen(PORT);
