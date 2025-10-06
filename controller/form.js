const Dao = require('../dao/form');
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
    const dashboard = await Dao.findOne(dbName, query, projection, options);
    if (!dashboard) {
      // return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.USER.EMAIL_PASSWORD_NOT_CORRECT });
    }
    return res.status(STATUS.OK).json({ dashboard, message: MESSAGE.USER.LOGIN_SUCCESSFULLY });
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
    options = options ? JSON.parse(options) : null;

    const forms = await Dao.find(dbName, query, projection, options);
    return res.status(STATUS.OK).json({ forms });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const update = async (req, res) => {
  const { dbname: dbName } = req.headers;
  let { query = null, projection = null, options = null } = req.body;

  query = query ? JSON.parse(query) : {};
  projection = projection ? JSON.parse(projection) : {};
  options = options ? JSON.parse(options) : {};

  try {
    let form;

    if (!query || Object.keys(query).length === 0) {
      form = await Dao.insertOne(dbName, projection);
      return res
      .status(STATUS.CREATED)
      .json({ form, message: `Form ${MESSAGE.CREATED_SUCCESSFULLY}` });
    } else {
      form = await Dao.findOneAndUpdate(
        dbName,
        query,
        projection,
        { ...options, upsert: true, new: true }
      );
      return res
      .status(STATUS.OK)
      .json({ form, message: `Form ${MESSAGE.UPDATED_SUCCESSFULLY}` });
    }
    
  } catch (error) {
    console.error("❌ update error:", error);
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE.SERVER_ERROR });
  }
};


const deleteForm = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;

  query = query ? JSON.parse(query) : {};
  projection = projection ? JSON.parse(projection) : {};
  options = options ? JSON.parse(options) : {};

  try {
    const form = await Dao.deleteOne(dbName, query, projection, options);
    return res.status(STATUS.OK).json({ form, message: `Form ${MESSAGE.DELETED_SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}





module.exports = {
  fetch,
  fetchs,
  update,
  deleteForm,
}
