const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUserByUserGUID,
  controlDeleteUser,
  fetchAllUsers,
  getUserByGUID
} = require("../controller/controller");

const { authenticateToken } = require("../authentication/config");

const { createToken } = require("../controller/controller");

//Create a new user. *only Unique emails are allowed.
router.post("/users", createUser);

//Login to access other APIs to perform CRUD opeartion
router.post("/login/:UserGUID", createToken);


//Retrieve a specific user by ID.
router.get("/tasks/:UserGUID", authenticateToken,getUserByGUID);

//Retrieve a list of all users.
router.get("/users",authenticateToken, fetchAllUsers);

//Update an existing user by ID.
router.put("/tasks/:UserGUID", authenticateToken,updateUserByUserGUID);

//Delete an existing user by ID.
router.delete("/tasks/:UserGUID", authenticateToken, controlDeleteUser);


module.exports = router;
