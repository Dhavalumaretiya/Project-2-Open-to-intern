const mongoose = require('mongoose')




const collageschema= new mongoose.Schema({

     name: {

        type: String,
        required: true,
        unique:true
     },

      fullname:{
          type: String,
          required: true, 
      },

      logolink:{
        type: String,
        required: true,
        trim: true
      },

      isDeleted:{
          type:Boolean,
          default:false,
      },

    },
    {timestamps: true})



 module.exports=mongoose.model('collageModel',collageschema)