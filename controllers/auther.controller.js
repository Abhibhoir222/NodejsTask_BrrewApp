const ErrorResponce = require("../utils/errorResponce")

const autherModel = require("../models/auther.model")

exports.autherAdd = async(req,res)=>{
    try {
     
        const {autherName,autherDob,bookPublishYear}= req.body

        const autherData = await autherModel.create({
            autherName,autherDob,bookPublishYear
        });

        await res.status(201).json({
            success:true,
            data:{
                autherData
            }
        })

    } catch (error) {
        console.log(error);
    }
}


exports.autherGet =async(req,res)=>{
    try {

        const autherData = await autherModel.find({})

        await res.status(200).json({
            success:true,
            data:{
                autherData
            }
        })

    } catch (error) {
        console.log(error);
    }
}


// exports.autherLookup = async(req,res)=>{
//     try {

//         const autherData = await autherModel.aggregate([{
//             $lookup:{
//                 from:"authers",
//                 localField:"author",
//                 foreignField:"autherName",
//                 as:"FullCollection"
//             }
//         }])

//         res.status(200).json({
//             success:true,
//             data:{
//                 autherData
//             }
//         })
        
//     } catch (error) {
//         console.log(error);
//     }
// }