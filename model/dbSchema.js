const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/UsersData")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  UserGUID: String,
  Name: { type: String, required: true },
  EmailAddress: { type: String, required: true },
  BusinessName: { type: String, required: true },
  BusinessNumber: { type: String, required: true },
  UniqueCode: String,
  ExternalReference: { type: String, required: true },
  PhoneNum: { type: String, required: true },
  HomeAddress: { type: String, required: true },
  PostalAddress: { type: String, required: true },
  CreationDate: String,
  ModifyDate: String,
  ArchiveDate: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = {
  User
};
