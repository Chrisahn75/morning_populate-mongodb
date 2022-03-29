const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  firstName: String,
  surname: String,
  age: Number,
  address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
});

const student = mongoose.model("student", StudentSchema);

module.exports = student;