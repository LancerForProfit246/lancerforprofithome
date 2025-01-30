const emoticons = require("mongoose");

const Emoticons = new emoticons.Schema({

    emoticon:{
        type:String,
        required:true
    },

    emojiname:{
        type:String,
        required:true
    },

    unicode:{
        type:String,
    },

    imageurl:{
        type:String,
    },


});