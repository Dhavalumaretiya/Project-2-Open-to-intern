const mongoose = require('mongoose')




const collageschema= new mongoose.Schema({

     name: {

        type: String,
        required: true,
        unique:true
     },

      fulllname:
      {
          type: String,
          required: true, trim:true
      },

      logolink:{
         required:true,
      },

      isDeleted:{
          type:Boolean,
          default:false,
      },

    },
    {timestamps: true})



             module.exports=mongoose.model('collageModel',collageschema)