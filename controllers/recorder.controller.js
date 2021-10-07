const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const service_record=require('../services/services.records')


///--------------------------------------------------------

const create = async (req, res) => {
  try {
      console.log(req.body)
      let rec=
      {
        record:req.body.record,
        screensize:req.body.screensize,
        time:req.body.time,
        date:req.body.date,
        sesid:req.body.sesid
      }
      console.log(rec)
     const result= await  service_record.addrecord(rec)
    return await  res.status(200).json(result)
   }catch(err) {
      console.log("error:"+err)
     return  await  res.status(400).json(err)
    }

}
const get= async (req, res) => {
  try {

     const result= await  service_record.getrecord(req.params.sesid)
     return await  res.status(200).json(result)
   }catch(err) {
      console.log("error:"+err)
    return  await  res.status(400).json(err)
    }

}







module.exports.create=create;
module.exports.get=get;
