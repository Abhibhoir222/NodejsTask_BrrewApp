const express = require('express');
const router = express.Router()

// controller
const { bookDetailsAdd, bookDetilsAllGet, bookDetailsUpdate, bookdetailsDelete } = require('../controllers/bookdetails.controller');

// Public Access Routes

router.post('/bookdetails-add',bookDetailsAdd);
router.get('/boodetails-getAll',bookDetilsAllGet)


//Todo Update Book Details Path
router.post('/bookdetails-update/:id',bookDetailsUpdate)

//! Book Delete path
router.delete('/bookdetails-delete/:id',bookdetailsDelete)


module.exports = router;