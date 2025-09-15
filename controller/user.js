const Dao = require('../dao/user');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');
const { createDatabase } = require('../helper/user');

const fetchUser = async (req, res) => {
  let { query = null, projection = null, options = null } = req.query;
  const dbName = req.headers['dbname'];
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;
  try {
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
const users = async (req, res) => {
  let { query = null, projection = null, options = null } = req.query;
  const dbName = req.headers['dbname'];
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
  let { query = null, projection = null, options = null } = req.body;
  const dbName = req.headers['dbname'];
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
  const { _id } = req.params;
  const dbName = req.headers['dbname'];
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
  const { _id } = req.params;
  const dbName = req.headers['dbname'];

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
  const { _id } = req.params;
  const dbName = req.headers['dbname'];

  try {
    const isEmailExist = await Dao.findOne(dbName, { _id: _id });
    if(!isEmailExist){
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: '' });
    }
    const user = await Dao.findOneAndUpdate(dbName, { _id: _id }, { isCreatedDatabase: true, password: isEmailExist.domain });
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

const update = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.body;

  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const user = await Dao.findOneAndUpdate(dbName, { _id, ...query }, projection, options);
    return res.status(STATUS.OK).json({ user, message: MESSAGE.USER_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}
const fetch = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;

  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const user = await Dao.findOne(dbName, { _id, ...query }, projection, options);
    return res.status(STATUS.OK).json({ user });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}



module.exports = {
  /** GET */
  fetch,
  users,



  fetchUser,
  fetchUserById,
  /** GET */

  /** POST */
  update,


  saveUser,
  updateUserById,
  createDatabaseById,
  /** POST */
}
