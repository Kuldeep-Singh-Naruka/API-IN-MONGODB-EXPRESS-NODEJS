
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db =  mongoose.connect("mongodb://127.0.0.1:27017/apitest")
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

module.exports = db;

