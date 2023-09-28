const crypto = require('crypto');
const repo = require("../repository/repo");
const { User } = require("../model/dbSchema");

function generateDistinctCode() {
  return crypto.randomBytes(16).toString("hex");
}

const createuser = async function (
  Name,
  EmailAddress,
  BusinessName,
  BusinessNumber,
  ExternalReference,
  PhoneNum,
  HomeAddress,
  PostalAddress
) {
  try {
    const existingUser = await repo.findUserByEmail(EmailAddress);
    if (!existingUser[0]) {
      const user = new User({
        UserGUID: generateDistinctCode(),
        Name: Name,
        EmailAddress: EmailAddress,
        BusinessName: BusinessName,
        BusinessNumber: BusinessNumber,
        UniqueCode: generateDistinctCode(),
        ExternalReference: ExternalReference,
        PhoneNum: PhoneNum,
        HomeAddress: HomeAddress,
        PostalAddress: PostalAddress,
        CreationDate: new Date(),
        ModifyDate: new Date(),
        ArchiveDate: new Date(),
      });
      await User.create(user);
      return JSON.stringify({ message: "User Created Successfully" });
    } else {
      return JSON.stringify({ message: "User already exists" });
    }
  } catch (err) {
    return err.message;
  }
};

const updateUser = async function (UserGUID, req) {
  let existingUser = await repo.findUserById(UserGUID);
  try {
    if (existingUser[0]) {
      let i=await repo.updateUserDetails(UserGUID,req);
      if(i==1){
        await repo.updateModidifiedDate(UserGUID);
        return JSON.stringify({
          message: "UserData updation is successfully",
        });
      }else{
        return JSON.stringify({
          message: "No Data Updated",
        });
      }
    } else {
      return JSON.stringify({ message: "profile doesn't match our records" });
    }
  } catch (err) {
    return err.message;
  }
};

const deleteUser = async function (UserGUID) {
  const existingUser = await repo.findUserById(UserGUID);
  try {
    if (existingUser[0]) {
      await repo.deleteUserById(UserGUID);
      return JSON.stringify({
        message: "User profile deleted Successfully",
      });
    } else {
      return JSON.stringify({
        message:
          "User profile doesn't match our records or User data has been deleted already",
      });
    }
  } catch (err) {
    return err.message;
  }
};

const getAllusers = async function (page, limit) {
  let data = await repo.FetchAllUsers(page, limit);
  return data;
};

const fetchUserByID = async function (UserGUID) {
  const existingUser = await repo.findUserById(UserGUID);
  try {
    if (existingUser[0]) {
      return existingUser;
    } else {
      return JSON.stringify({
        message: "User profile doesn't match our records",
      });
    }
  } catch (err) {
    return err.message;
  }
};

  module.exports = {
    createuser,
    updateUser,
    deleteUser,
    getAllusers,
    fetchUserByID
  };