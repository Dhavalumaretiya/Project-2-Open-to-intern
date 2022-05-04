const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();

const app= express();


mongoose.connect("mongodb+srv://FunctionUp-Uranium1:GQgLhymenkDpmdlI@cluster0.xmo61.mongodb.net/Parteek",{ useNewUrlParser:true})

.then(()=>console.log("Project Blogging Site - Database Connected"))
.catch((err)=>console.log(err));


app.use("/", router);



app.listen(3000, function()
{
console.log("Express app running on port" + 3000);

});