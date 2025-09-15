const Dao = require('../dao/master');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');


const fetchs = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const masters = await Dao.find(dbName, query, projection, options);
    if (!masters) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.OK).json({ masters });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};
const fetch = async (req, res) => {
  const { dbname: dbName } = req.headers;
  const { _id } = req.params;
  let { query = null, projection = null, options = null } = req.query;

  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const master = await Dao.findOne(dbName, { _id, ...query }, projection, options);
    if (!master) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.OK).json({ master });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};
const add = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.body;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const master = await Dao.insertOne(dbName, query, projection, options);
    if (!master) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.CREATED).json({ master, message: MESSAGE.MASTER_CREATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};
const update = async (req, res) => {
  const { dbname: dbName } = req.headers;
  const { _id } = req.params;
  let { query = null, projection = null, options = null } = req.body;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const master = await Dao.findOneAndUpdate(dbName, { ...query, _id }, projection, options);
    if (!master) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.CREATED).json({ master, message: MESSAGE.MASTER_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};





module.exports = {
  /** GET */
  fetch,
  fetchs,
  /** GET */

  /** POST */
  add,
  update,
  /** POST */
}
