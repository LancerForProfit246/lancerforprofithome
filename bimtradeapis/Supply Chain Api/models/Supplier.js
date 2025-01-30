const mongoose = require("mongoose")

const Supplier = new mongoose.Schema({

    supplierid:{
        type:Number,
        required:true
    },

    suppliername:{
        type:String,
        required:true
    },
    
    supplieremail:{
        type:String,
        required:true
    },
    
    supplieraddress:{
        type:String,
        required:true
    },

    suppliercontact:{
        type:Number,
        required:true
    }

    suppliedproducts:{
        type:Array
    }





})