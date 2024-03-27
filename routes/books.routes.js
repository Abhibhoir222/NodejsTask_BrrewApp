const express = require('express');
const router = express.Router()

// controller
const { bookDetailsAdd, bookDetilsAllGet, bookDetailsUpdate, bookdetailsDelete, bookLookup, bookSearch, booksSummry } = require('../controllers/bookdetails.controller');

// Public Access Routes

router.post('/bookdetails-add',bookDetailsAdd);
router.get('/boodetails-getAll',bookDetilsAllGet)
router.get('/bookLookup',bookLookup)
router.get('/booksearch/:searchKey',bookSearch)
router.get('/booktype/:type',booksSummry)



//Todo Update Book Details Path
router.put('/bookdetails-update/:id',bookDetailsUpdate)

//! Book Delete path
router.delete('/bookdetails-delete/:id',bookdetailsDelete)


module.exports = router;