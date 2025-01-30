const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
    grouupid:{
        type:Number,
    
    },
    groupname:{
       type:String,
       required:true,
    },
    groupdescription:{
        type:String,
        required:true,
    },

    members:{
        type:Array,
    },
    
    adminid:{
        type:Number,
    },


    groupimage:{
        type:Array,
    },
    
    gctimestamp:{
        type:Date,
        default:Date.now
    },



});