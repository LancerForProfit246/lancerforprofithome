const mongoose = require("mongoose");

const Attachment = new attachment.Schema({

    attachmentid:{
        type:Number,
        required:true
    },

    file:{
        type:String,
        required:true
    },
    
})