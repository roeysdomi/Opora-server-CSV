const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const conroller_record=require('../controllers/recorder.controller')


///--------------------------------------------------------
router.post('/addrecord',conroller_record.create)
router.get('/getrecord/:sesid',conroller_record.get)
//---------------------------------------------------------
module.exports=router;
