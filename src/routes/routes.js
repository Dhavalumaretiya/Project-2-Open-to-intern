const allcontroller = require('../Controller/allcontroller')
const express = require('express');
const router = express.Router();



router.post('/post' , allcontroller.x1)

module.exports=router