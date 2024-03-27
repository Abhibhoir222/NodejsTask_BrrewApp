const mongoose = require("mongoose")

const autherschema = new mongoose.Schema({
    autherName:{
        type:String
    },
    autherDob:{
        type:String
    },
    bookPublishYear:{
        type:String
    }
})

module.exports = mongoose.model('auther',autherschema)