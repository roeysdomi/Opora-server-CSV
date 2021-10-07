const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const conroller_table=require('../controllers/table.controller')


///--------------------------------------------------------

router.get('/gettable/', conroller_table.get)
//--------------------------------------------------

module.exports=router;
