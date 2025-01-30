const mongoose = require("mongoose");

const Presence = new mongoose.Schema({
    
    lastonline:{
        type:Date,
        default:Date.now
    },
});