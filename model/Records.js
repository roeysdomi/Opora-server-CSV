const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({

  record: {
    type: String,
    required: true,
    default: 0
  },
  screensize: {
      type: String,
      required: false
    },
    time: {
      type: String,
      required: false
    },
    date: {
      type: String,
      required: false
    },
    sesid: {
      type: String,
      required: false,
      default: 0
    },


});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
