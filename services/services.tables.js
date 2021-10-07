// const mongoose = require('mongoose');

var rec = require('../model/Records');
var tab = require('../model/Table');




const getTable = async () => {
  try {
    let data = await tab.find()
    return data
  } catch (err) {
    return err
  }
}


//----------------------------

exports.getTable = getTable;

//-----------------------------
