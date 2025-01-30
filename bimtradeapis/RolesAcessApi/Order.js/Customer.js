const mongoose = require("mongoose");

const customer = new mongooose.Schema({

    customerid:{
      type:String,
      required:true,
    },

    customername:{
        type:String,
        required:true,
    },
     
    customeremail:{
        type:String,
        required:true,
    },  

    paymethod:{
        type:String,
        required:true,
    },

    paystatus:{
        type:String,
        required:true,
    },
    });