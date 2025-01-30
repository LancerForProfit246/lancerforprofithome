const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
         userprofile:{
             name:{
                 type:String,
                 required:true
             },
             phonenumber:{
                 type:Number,
                 required:true
             },
             address:{
                 type:String,
                 required:true
             },
             profilepic:{
                type:Array,
             },
             email:{
                 type:String,
                 required:true
             }
        
         },

         bidhistory:{
             type:Array,
         },

         accountbalance:{
             type:Number,
             required:true
         }

    }
);

module.exports = mongoose.model("User",UserSchema);