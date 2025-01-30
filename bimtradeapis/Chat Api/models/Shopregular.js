const mongoose = require("mongoose");

const Shopregular = new mongoose.Schema({
    
    regularid:{
       type:Number,
       required:true,
    },

    packagestatus :{
        type:String,
        default:"active"
    }


});