const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({

    title:{
        type:String,
        requried:[true,"Please enter the Book Title"],
        maxlengh:20
    },
    author:{
        type:String,
        requried:[true,"Please enter the Book Author"],
        maxlengh:20
    },
    summary:{
        type:String,
        requried:[true,"Please enter the Book Summary"],
        maxlengh:20
    }
},{timestamps:true})

module.exports= mongoose.model('bookdetails',booksSchema)