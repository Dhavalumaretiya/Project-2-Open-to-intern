const express = require('express');
const router = express.Router();

const allcontroller = require("../Controller/allcontroller")


router.post('/post' , allcontroller.x1)
router.post('/post2' , allcontroller.x2)

module.exports=router;