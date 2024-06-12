const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.student = require("./models/student.model");
db.teacher = require("./models/teacher.model");
db.classes = require("./models/classes.model");

module.exports = db;
