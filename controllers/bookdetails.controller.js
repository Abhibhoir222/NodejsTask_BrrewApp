// Rrror Handeler
const ErrorResponce = require("../utils/errorResponce") 

//Import Model

const bookdetailsModel = require('../models/books.models')



//* Add book 
exports.bookDetailsAdd = async(req,res,next)=>{

    const {title,author,summary} = req.body;
    try {
        const bookdetails = await bookdetailsModel.create({
            title,
            author,
            summary
        });
        await bookdetails.save();
        res.status(201).json({
            success:true,
            bookdetails
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorResponce(error.message,500))
    }
};

//* Get all book

exports.bookDetilsAllGet = async (req, res, next) => {
    try {
      const bookdetails = await bookdetailsModel.find();
      return res.status(200).json({
        success: true,
        bookdetails,
      });
    } catch (error) {
      console.log(error);
      return  next(new ErrorResponce("Error in fetching users", 500));
    }
  };

//Todo Update Book details based on ID

exports.bookDetailsUpdate = async (req, res, next) => {
    try {
      const bookdetails = await bookdetailsModel.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message:"The Book name" + " " + bookdetails.title +"  " + "is Updated"
      });
    } catch (error) {
      next(new ErrorResponce(error.message, 500));
    }
  };


//! Book Delete

exports.bookdetailsDelete = async(req,res,next)=>{
    try {
      const bookdetails = await bookdetailsModel.findByIdAndDelete(req.params.id)
      return res.status(200).json({
        success:true,
        message:"The Book is Deleted"
      })
    } catch (error) {
      console.log(error);
      return next(new ErrorResponce(error.message,500))
    }
  }
