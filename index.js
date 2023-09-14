const express = require('express');
const router = require('./routes/routes');
const app = express();
// const methodOverride = require('method-override');
// const mongoose= require('mongoose');
require('dotenv').config();
// console.log("index");
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));
app.use(express.json());
var  path  = require('path');
// const mongoDb="mongodb://0.0.0.0:27017/blogs";  for local db host
// const mongoDb=process.env.mongoDbkeys;


// mongoose.connect(mongoDb)
// .then(console.log("Sucessfully Connected to mongoDB"))
// .then(()=>{
//   app.listen(5000);
//  console.log("Listening on port 5000");
// })
// .catch((err)=>{console.log("Unable to connect to mongodb"+err)})


app.listen(5000);
console.log("Listening on port 5000");
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use('/', router);























