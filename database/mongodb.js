const mongoose = require('mongoose');
const db = require('./config/key').mongoURI;


exports.mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => {console.log('MongoDB Connected')})
  .catch(err => console.log(err));
  mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
