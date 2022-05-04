const mongoose = require('mongoose')
 const objectId = mongoose.Schema.Types.ObjectId

const internSchema= new mongoose.Schema({

    name: {

        type: String,
        required: true,
        unique:true
     },

     email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        // validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

      mobile:
      {
          type: Number,
          required: true, 
          match:[/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/, 'Please fill a valid number']
      },
        
      collageId:{
        type:objectId,
        ref:'collageModel',
        // required:true,
      },

      isDeleted:{
          type:Boolean,
          default:false,
      },

    },
    {timestamps: true})



 module.exports= mongoose.model('myintern',internSchema)