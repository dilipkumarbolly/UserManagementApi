const express = require("express");
const app = express();
const service = require("../service/service");
const repo=require("../repository/repo");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const createUser = async (req, res) => {
   const {
     Name,
     EmailAddress,
     BusinessName,
     BusinessNumber,
     ExternalReference,
     PhoneNum,
     HomeAddress,
     PostalAddress,
   } = req.body;

    if (
      !(
        Name &&
        EmailAddress &&
        BusinessName &&
        BusinessNumber &&
        ExternalReference &&
        PhoneNum &&
        HomeAddress&&
        PostalAddress
      )
    ) {
      return res.send({ error: "please provide all required userDetails" });
    }
    let data = await service.createuser(
      Name,
      EmailAddress,
      BusinessName,
      BusinessNumber,
      ExternalReference,
      PhoneNum,
      HomeAddress,
      PostalAddress
    );
    return res.status(200).send(data);
  };

const getUserByGUID = async (req, res) => {
  const { UserGUID } = req.params;
  if (!UserGUID) {
    return res.send({ error: "please provide correct UserGUID" });
  }
  let data = await service.fetchUserByID(UserGUID);
  return res.send(data);
};

const fetchAllUsers = async (req, res) => {
  let data = await service.getAllusers();
  return res.send(data);
};

const controlDeleteUser = async (req, res) => {
  const { UserGUID } = req.params;
  if (!UserGUID) {
    return res.send({ error: "please provide correct UserGUID" });
  }
  let data = await service.deleteUser(UserGUID);
  return res.send(data);
};

const updateUserByUserGUID = async (req, res) => {
    const { UserGUID } = req.params;
    if (!UserGUID) {
      return res.send({ error: "please provide correct UserGUID" });
    }
    let data = await service.updateUser(
      UserGUID,req
    );
    return res.send(data);
};

const createToken = async (req, res) => {
  const { UserGUID } = req.params;
  if (!UserGUID) {
    return res.send({ error: "please provide correct UserGUID" });
  }
  const existingUser = await repo.findUserById(UserGUID);
  const user = {
    UserGUID: UserGUID,
  };
  if (existingUser[0]) {
    jwt.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" },
      async (err, token) => {
        if (err) {
          console.log(err);
        } else {
          return res.status(200).send({ accToken: token });
        }
      }
    );
  } else {
    return res.status(404).send({ error: "User doesnt exist in our records" });
  }
};  

  module.exports = {
    createUser,
    updateUserByUserGUID,
    controlDeleteUser,
    fetchAllUsers,
    getUserByGUID,
    createToken
  };