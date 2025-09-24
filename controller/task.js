const Dao = require('../dao/task');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');


const getTasks = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.body;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;
  try {
    const tasks = await Dao.find(dbName, { _id: query._id, ...query}, projection, options);
    return res.status(STATUS.OK).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}

const saveDepartment = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.body;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    if (query?._id) {
      const role = await Dao.findOneAndUpdate(dbName, { _id: query._id }, query, { new: true, ...options });
      if (!role) {
        return res.status(STATUS.NOT_FOUND).json({ message: MESSAGE.ROLE_NOT_FOUND });
      }
      return res.status(STATUS.OK).json({ role, message: MESSAGE.ROLE_UPDATED_SUCCESSFULLY });
    }
    const role = await Dao.insertOne(dbName, query, projection, options);
    if (!role) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.OK).json({ role, message: MESSAGE.ROLE_CREATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};





module.exports = {
  /** GET */
  getTasks,
  /** GET */

  /** POST */
  saveDepartment,
  /** POST */
}
