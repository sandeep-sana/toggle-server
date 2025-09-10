const Dao = require('../dao/user');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');
const { createDatabase } = require('../helper/user');

const fetchUser = async (req, res) => {
  let { query = null, projection = null, options = null, dbName } = req.query;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;
  try {
    console.log(dbName)
    const user = await Dao.findOne(dbName, query, projection, options);
    if (!user) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.EMAIL_PASSWORD_NOT_CORRECT });
    }
    return res.status(STATUS.OK).json({ user, message: MESSAGE.LOGIN_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}
const fetchUsers = async (req, res) => {
  let { query = null, projection = null, options = null, dbName } = req.query;
  try {
    query = query ? JSON.parse(query) : null;
    projection = projection ? JSON.parse(projection) : null;
    options = options ? JSON.parse(options) : null;
    const users = await Dao.find(dbName, query, projection, options);
    if (!users) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: '' });
    }
    return res.status(STATUS.OK).json({ users, message: '' });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const saveUser = async (req, res) => {
  let { query = null, projection = null, options = null, dbName } = req.body;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;
  try {
    const isEmailExist = await Dao.findOne(dbName, { 'email': query.email });
    if (isEmailExist) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.EMAIL_ALREADY_EXIST });
    }
    const isDomainExist = await Dao.findOne(dbName, { 'domain': query.domain });
    if (isDomainExist) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.DOMAIN_ALREADY_EXIST });
    }
    const user = await Dao.insertOne(dbName, query, projection, options);
    return res.status(STATUS.CREATED).json({ user, message: MESSAGE.USER_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}


const fetchUserById = async (req, res) => {
  const { _id, dbName } = req.params;
  try {
    const user = await Dao.findOne(dbName, { _id: _id });
    if (!user) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: '' });
    }
    return res.status(STATUS.OK).json({ user, message: '' });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}
const updateUserById = async (req, res) => {
  const { _id, dbName } = req.params;
  console.log()
  let { projection = null } = req.body;
  try {
    projection = projection ? JSON.parse(projection) : null;
    const user = await Dao.findOneAndUpdate(dbName, { _id: _id }, projection);
    if (!user) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: '' });
    }
    return res.status(STATUS.OK).json({ user, message: MESSAGE.USER_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}
const createDatabaseById = async (req, res) => {
  const { _id, dbName } = req.params;
  try {
    const user = await Dao.findOneAndUpdate(dbName, { _id: _id }, { isCreatedDatabase: true });
    if (!user) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: '' });
    }
    await createDatabase(user);
    return res.status(STATUS.OK).json({ user, message: MESSAGE.DATABASE_CREATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}




module.exports = {
  /** GET */
  fetchUser,
  fetchUsers,
  fetchUserById,
  /** GET */

  /** POST */
  saveUser,
  updateUserById,
  createDatabaseById,
  /** POST */
}
