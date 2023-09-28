const { User } = require("../model/dbSchema");

const findUserByEmail = async function (email) {
  const existUser = await User.find({ EmailAddress : email });
  return existUser;
};

const findUserById=async function(UserGUID){
  const existUser = await User.find({ UserGUID : UserGUID });
  return existUser;
}

const findUserByName=async function(Name){
  const existUser = await User.find({ Name: Name });
  return existUser;
}

const updateUserDetails=async function(UserGUID,req){
  let updatedResult=await User.updateOne(
    { UserGUID: UserGUID },
    { $set: { ...req.body } },
    { upsert: false }
  );
  return updatedResult.modifiedCount;
}

const updateModidifiedDate=async function(UserGUID){
  await User.updateOne(
    { UserGUID: UserGUID },
    { $set: { ModifyDate: new Date() } },
    { upsert: false }
  );
}


const deleteUserById = async function (UserGUID) {
  await User.deleteOne({ UserGUID: UserGUID });
};

const FetchAllUsers = async function () {
  let data = await User.find();
  return data;
};

module.exports = {
  findUserByEmail,
  findUserById,
  updateUserDetails,
  deleteUserById,
  FetchAllUsers,
  updateModidifiedDate,
  findUserByName,
};