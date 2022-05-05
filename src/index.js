const express=require("express");
var bodyParser=require("body-parser")
const route=require("./routes/route.js");

const app= express();
const mongoose=require("mongoose")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://uranium:uranium@cluster0.pgmlm.mongodb.net/test",{ useNewUrlParser:true})

.then(()=>console.log("Project Blogging Site - Database Connected"))
.catch((err)=>console.log(err));

app.use("/",route);

// const { body, validationResult } = require('express-validator');

// app.post(
//   '/post',

//   body('name').isLength({ min: 3 , max:20 }),
//   body('email').isEmail(),
//   body('mobile').isLength({ min: 10 }),
//   body('collageId').isObject(),
// //   body('isDeleted').isLength({ min: 5 }),
//   (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     post.create({
//       username: req.body.username,
//       password: req.body.password,
//     }).then(user => res.json(user));
//   },
// );


app.listen(3000, function()
{
console.log("Express app running on port" + 3000);

});