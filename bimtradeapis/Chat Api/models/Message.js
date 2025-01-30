const mongoose = require("mongoose");

const Message = new mongooseSchema({

    messageid:{
        type:Number,
        required:true
    },
    
    senderid:{
        type:Number,
        required:true
    },

    receiverid:{
        type:Number,
        required:true
    },
    
    groupid:{
        type:Number,
        required:true
    },
    
    content:{
        type:Array,
    },

    readstatus:{
        type:Boolean,
        default:false
    },

    chattimestamp:{ //Fix timestamp the correct way
        type:Date,
    },

   
  customerstatus:{
    type:Boolean,
    default:false
   },

});