const express= require('express');
const mongoose = require('mongoose')
const route = require('./routes/route.js')


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://uranium:uranium@cluster0.pgmlm.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
  )
  .then(() =>
    console.log("MongoDB is connected / Cluster0 / group83Database")
  )
  .catch((err) => console.log(err));

  app.use("/", route);

  app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
  });
  