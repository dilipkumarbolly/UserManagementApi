const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(express.json());

function authenticateToken(req, res, next) {
    const requestheader = req.headers["authorization"];
    if (typeof requestheader !== "undefined") {
      const token = requestheader;
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err) {
          res.send({ result: "invalid token. Please enter a valid token" });
        } else {
          next();
        }
      });
    } else {
      return res.status(404).send("invalid token. Please enter a valid token in headers");
    }
  }

  module.exports = {
    authenticateToken,
  };