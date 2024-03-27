// Rrror Handeler
const ErrorResponce = require("../utils/errorResponce");

//Import Model

const bookdetailsModel = require("../models/books.models");

//* Add book
exports.bookDetailsAdd = async (req, res, next) => {
  const { title, author, summary } = req.body;

  // Split the summary string into an array of words
  const summaryArray = summary.split(' ');
  try {
    const bookdetails = await bookdetailsModel.create({
      title,
      author,
      summary:summaryArray,
    });
    await bookdetails.save();
    res.status(201).json({
      success: true,
      bookdetails,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponce(error.message, 500));
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
    return next(new ErrorResponce("Error in fetching Books", 500));
  }
};

//Todo Update Book details based on ID

exports.bookDetailsUpdate = async (req, res, next) => {
  try {
    const bookdetails = await bookdetailsModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "The Book name" + " " + bookdetails.title + "  " + "is Updated",
    });
  } catch (error) {
    next(new ErrorResponce(error.message, 500));
  }
};

//! Book Delete

exports.bookdetailsDelete = async (req, res, next) => {
  try {
    const bookdetails = await bookdetailsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "The Book is Deleted",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponce(error.message, 500));
  }
};

exports.bookLookup = async (req, res) => {
  try {
    const autherData = await bookdetailsModel.aggregate([
      {
        $lookup: {
          from: "authers", // other document from colletion
          localField: "author", // present document
          foreignField: "autherName", // other field from document to match
          as: "FullCollection", // field to get into the field
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        autherData,
      },
    });
  } catch (error) {
    console.log(error);
  }
};



exports.bookSearch = async (req, res, next) => {
  try {
    const searchKey = req.params.searchKey; // Using 'searchKey' instead of 'key'
    if (!searchKey) {
      return res.status(400).json({ success: false, message: 'Search key is required.' });
    }
    console.log("req.params", req.params);
    const pageSize = 10;
    const currentPage = parseInt(req.params.page) || 1;

    const query = {
      $or: [
        { title: { $regex: searchKey, $options: "i" } },
        { author: { $regex: searchKey, $options: "i" } },
      ],
    };

    const totalUser = await bookdetailsModel.countDocuments(query);
    const totalPage = Math.ceil(totalUser / pageSize);

    const user = await bookdetailsModel.aggregate([
      { $match: query },
      { $skip: (currentPage - 1) * pageSize },
      { $limit: pageSize },
    ]);

    return res.status(200).json({
      success: true,
      currentPage,
      totalPage,
      totalUser,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};



exports.booksSummry = async(req,res)=>{
  try {
    const type = req.params.type
    
    const bookData = await bookdetailsModel.aggregate([
      {$unwind:'$summary'},
      {$group:{
        _id:'$summary',
        booksCount:{$sum:1},
        booknames:{$push:'$title'}
      }},
      {$addFields:{typeof:'$_id'}},
      {$project:{_id:0}},
      {$match:{typeof:type}}

    ])

    res.status(200).json({
      success:true,
      data:{
        bookData
      }
    })

  } catch (error) {
    console.log(error);
    return next(error)
  }
}