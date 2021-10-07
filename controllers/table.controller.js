const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const service_table=require('../services/services.tables')



const get= async (req, res) => {
  try {
     const result= await  service_table.getTable()
    return  await  res.status(200).json(result)
   }catch(err) {
      console.log("error:"+err)
    return   await  res.status(400).json(err)
    }

}









module.exports.get=get;
