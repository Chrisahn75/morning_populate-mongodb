const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  streetName: String,
  streetNumber: String,
  postCode: String,
  city: String,
});

const address = mongoose.model("address", AddressSchema);

module.exports = address;