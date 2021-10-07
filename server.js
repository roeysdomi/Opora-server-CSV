if (process.env.NODE_ENV !== "production") {
 require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const db = require("./config/key").mongoURI;
const mongoose = require("mongoose");
const rec_route = require("./routes/record.route");
const table_route = require("./routes/table.route");

///=======================================================
app.use(
 cors({
  origin: "*"
 })
);

app.use(express.urlencoded({extended: false}));
///=========================================================

// --------------connect to mongo------------------
mongoose
 .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
  console.log("MongoDB Connected");
 })
 .catch(err => console.log(err));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
///========================================
// records route
app.use(rec_route);
//table route
app.use(table_route);

///========================================

app.listen(4000);
