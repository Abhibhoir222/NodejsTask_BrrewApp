const express = require('express')
const { autherAdd, autherGet } = require('../controllers/auther.controller')
const router = express.Router()

router.post('/autherAdd',autherAdd)
router.get('/autherGet',autherGet)



module.exports = router