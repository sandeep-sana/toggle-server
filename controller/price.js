const Dao = require('../dao/price');
const mongoose = require('mongoose');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');

const fetch = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;

  query = query ? JSON.parse(query) : {};
  projection = projection ? JSON.parse(projection) : {};
  options = options ? JSON.parse(options) : {};

  if (_id) {
    query._id = new mongoose.Types.ObjectId(_id);
  }

  try {
    const user = await Dao.findOne(dbName, query, projection, options);
    if (!user) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.USER.EMAIL_PASSWORD_NOT_CORRECT });
    }
    return res.status(STATUS.OK).json({ user, message: MESSAGE.USER.LOGIN_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const fetchs = async (req, res) => {
  try {
    const { dbname: dbName, _id } = req.headers;
    let { query = null, projection = null, options = null } = req.query;

    query = query ? JSON.parse(query) : null;
    projection = projection ? JSON.parse(projection) : null;
    options = options ? JSON.parse(options) : {};
    options.sort = options.sort || { createdAt: -1 };

    const prices = await Dao.find(dbName, query, projection, options);
    return res.status(STATUS.OK).json({ prices });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const add = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.body;

  query = typeof query === 'string' ? JSON.parse(query) : (query || {});
  projection = projection ? JSON.parse(projection) : {};
  options = options ? JSON.parse(options) : {};

  try {
    if (!query?.name || query?.amount === undefined || query?.amount === null || query?.amount === '') {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Name and amount are required!' });
    }

    const isName = await Dao.findOne(dbName, { 'name': query.name });
    if (isName) {
      return res.status(STATUS.CONFLICT).json({ message: `Price ${MESSAGE.ALREADY_EXIST}` });
    }
    const price = await Dao.insertOne(dbName, query, projection, options);
    return res.status(STATUS.CREATED).json({ price, message: `Price created ${MESSAGE.SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const update = async (req, res) => {
  const { dbname: dbName } = req.headers;
  let { query = null, projection = null, options = null } = req.body;

  query = typeof query === 'string' ? JSON.parse(query) : (query || {});
  projection = projection ? JSON.parse(projection) : {};
  options = options ? JSON.parse(options) : {};

  try {
    if (!query?._id || !query?.name || query?.amount === undefined || query?.amount === null || query?.amount === '') {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Id, name and amount are required!' });
    }

    const duplicateName = await Dao.findOne(dbName, {
      name: query.name,
      _id: { $ne: new mongoose.Types.ObjectId(query._id) },
    });
    if (duplicateName) {
      return res.status(STATUS.CONFLICT).json({ message: `Price ${MESSAGE.ALREADY_EXIST}` });
    }

    const updateData = {
      name: query.name,
      amount: query.amount,
    };

    const price = await Dao.findOneAndUpdate(
      dbName,
      { _id: new mongoose.Types.ObjectId(query._id) },
      updateData,
      { new: true, ...options }
    );

    if (!price) {
      return res.status(STATUS.NOT_FOUND).json({ message: `Price ${MESSAGE.NOT_FOUND}` });
    }

    return res.status(STATUS.OK).json({ price, message: `Price updated ${MESSAGE.SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const deletePrice = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;

  query = query ? JSON.parse(query) : {};
  projection = projection ? JSON.parse(projection) : {};
  options = options ? JSON.parse(options) : {};

  try {
    const price = await Dao.deleteOne(dbName, query, projection, options);
    return res.status(STATUS.OK).json({ price, message: `Price deleted ${MESSAGE.SUCCESSFULLY}`});
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}





module.exports = {
  add,
  update,
  fetch,
  fetchs,
  deletePrice,
}
