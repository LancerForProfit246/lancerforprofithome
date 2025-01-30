const mongoose = require("mongoose");

const ItemSchema = new mongoose.schema(
    {
      itemname:{
        type:String,
        required:true,

      },

      itemdescription:{
        type:String,
        required:true,
      },

      currentBid:{
        type:Number,
        requireed:true,
      },

      reserveprice:{
        type:Number,
        required:false,
      },

      sellerinfo:{
        type:String,
        required:true,
      },

      bidhistory:{
        type:Array,
      }

    

    }
);

module.exports = mongoose.model("Item", ItemSchema);