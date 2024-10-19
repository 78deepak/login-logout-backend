const express = require('express')
const app = express()
require('./models/db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());  
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const model = require('../backend/models/User')
const ProductRouter = require('../backend/Routes/ProductRouter')
const AddPostRouter = require('../backend/Routes/AddPostRouter')
const AddPost = require('../backend/models/AddPost')
const Post = require('../backend/models/AddPost')
const dotenv = require("dotenv").config()
const AddImgRoute = require('./Routes/AddImgRoute')
const AddImg = require('../backend/models/AddImg');
// const { AllPostRoute } = require('../backend/Routes/AllPostRoute');
// const Post = require('../backend/models/AddPost')
// require("./models/AddImg")
app.get('/', function (req, res) {
  res.send('Hello World my name is de')
  console.log("server started at port number  3000");
});



app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.use('/addPost', AddPostRouter);
app.use('/upload-img',AddImgRoute);
// app.use(/)
// app.use('/AllPost',AllPostRoute);


// app.get('/Allpost', async (req, res) => {
//   const email = req.query.email
//   try {
//    const data =  await AddPost.find({ email: email });
//   //  const postCount = await AddPost.countDocuments({ email: email });
//     console.log("Data fetched");
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



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



app.listen(process.env.PORT);