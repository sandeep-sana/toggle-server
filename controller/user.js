const path = require("path");
const Dao = require('../dao/user');
const mongoose = require('mongoose');
const { Worker } = require("worker_threads");
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');
// const { createDatabase } = require('../workers/createDbWorker');




const login = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  const { email, password } = req.query;
  const query = {};
  if (_id) {
    query._id = new mongoose.Types.ObjectId(_id);
  } else if (email && password) {
    query.email = email;
    query.password = password;
  } else {
    return res.status(STATUS.BAD_REQUEST).json({ message: 'Provide _id header or email and password query params.' });
  }
  try {
    const user = await Dao.findOne(dbName, query);
    if (!user) {
      return res.status(STATUS.UNAUTHORIZED).json({ message: MESSAGE.EMAIL_PASSWORD_NOT_CORRECT });
    }
    return res.status(STATUS.OK).json({ user, message: `Login ${MESSAGE.SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}



const companySignup = async (req, res) => {
  const { dbname: dbName } = req.headers;
  const { domain, firstName, email } = req.body;
  try {
    if (!domain || !firstName) {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Domain and first name are required!' });
    }
    const isDomainExist = await Dao.findOne(dbName, { domain });
    if (isDomainExist) {
      return res.status(STATUS.CONFLICT).json({ message: `Domain ${MESSAGE.ALREADY_EXIST}` });
    }
    const isEmailExist = await Dao.findOne(dbName, { email });
    if (isEmailExist) {
      return res.status(STATUS.CONFLICT).json({ message: `Email ${MESSAGE.ALREADY_EXIST}` });
    }

    const user = await Dao.insertOne(dbName, req.body);
    return res.status(STATUS.CREATED).json({ user, message: `Company signup ${MESSAGE.SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}


// SANDEEP SANA
const modules = async (req, res) => {
  const { dbname, _id } = req.headers;
  try {
    const { modules } = await Dao.findOne(dbname, { _id: _id });
    if (!modules) {
      return res.status(STATUS.NOT_FOUND).json({ message: `Modules ${MESSAGE.NOT_FOUND}` });
    }
    return res.status(STATUS.OK).json({ modules, message: `Modules ${MESSAGE.SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const requestAccounts = async (req, res) => {
  const { dbname, _id } = req.headers;
  try {
    const { activeRole } = await Dao.findOne(dbname, { _id: _id });
    if(activeRole !== "SUPER_ADMIN") {
      return res.status(STATUS.FORBIDDEN).json({ message: `You are not authorized to access this resource ${MESSAGE.FORBIDDEN}` });
    }
    const requestAccounts = await Dao.find(dbname, { status: "PENDING" }, { _id: 1, companyName: 1, email: 1, phoneNumber: 1, description: 1 });
    if (!requestAccounts) {
      return res.status(STATUS.NOT_FOUND).json({ message: `Request accounts ${MESSAGE.NOT_FOUND}` });
    }
    return res.status(STATUS.OK).json({ requestAccounts, message: `Request accounts ${MESSAGE.SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const changeStatus = async (req, res) => {
  const { dbname, _id } = req.headers;
  const { status, _id: userId } = req.body;
  try {
    const { activeRole } = await Dao.findOne(dbname, { _id: _id });
    if(activeRole !== "SUPER_ADMIN") {
      return res.status(STATUS.FORBIDDEN).json({ message: `You are not authorized to access this resource ${MESSAGE.FORBIDDEN}` });
    }
    const user = await Dao.findOneAndUpdate(dbname, { _id: userId }, { status: status });
    if (!user) {
      return res.status(STATUS.NOT_FOUND).json({ message: `User ${MESSAGE.NOT_FOUND}` });
    }
    return res.status(STATUS.OK).json({ user, message: `User status changed ${MESSAGE.SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  // SANDEEP SANA
  modules,
  requestAccounts,
  changeStatus,
  companySignup,
  login,

}
