const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema= new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
         validator: function(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      }, message: "please fill a vaild email address", isAsync:false
    }},
    mobile:{
        type: Number,
        required:true,
        unique: true,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    },
    collegeId:{
        type: ObjectId,
        required: true,
        ref:'College'
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model('Intern', internSchema)