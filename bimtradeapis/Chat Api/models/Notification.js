const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    
    notifyid:{
        type:Number,
        required:true
    },
    
    userid:{
        type:Number,
        required:true
    },

    content:{
        type:Array,
    },

    notifytimestamp:{
        type:Date,
    },

    readstatus:{
        type:Boolean,
        default:false
    },

    notifystatus:{
        type:Boolean,
        default:false
    }


});