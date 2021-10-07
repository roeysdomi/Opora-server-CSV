// const mongoose = require('mongoose');

var rec = require('../model/Records');
var tab = require('../model/Table');


const addrecord = async (data) => {
  const {
    record,
    screensize,
    time,
    date,
    sesid
  } = data
  var add = new rec({
    record: record,
    screensize: screensize,
    time: time,
    date: date,
    sesid: sesid
  })
  tab.update({sesid: sesid},
     {
      record: record,
      screensize: screensize,
      time: time,
      date: date,
      sesid: sesid
    },
    {upsert : true}

  ).exec()
  return await add.save()

}

const getrecord = async (sesid) => {
  try {
    let data = await rec.find({
      sesid: sesid
    }, {})
    return data
} catch (err) {
    return err
  }
}



//----------------------------
exports.addrecord = addrecord;
exports.getrecord = getrecord;


//-----------------------------
