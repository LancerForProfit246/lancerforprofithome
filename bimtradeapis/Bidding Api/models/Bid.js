const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({


    bidamount:{
        type:Number,
        required:true,
    },

    bidtime:{
     type:Date,
     },

   bidinfo:{
     type:String,
     required:true,
    }




});

module.exports = mongoose.model("Bid", BidSchema);