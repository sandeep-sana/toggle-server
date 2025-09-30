const Dao = require('../dao/setting');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');


const fetch = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;
  try {
    const setting = await Dao.findOne(dbName, query, projection, options);
    return res.status(STATUS.OK).json({ setting });
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
  console.log(projection)
  try {
    const setting = await Dao.findOneAndUpdate(dbName, query, projection, options);
    console.log(setting)
    if (!setting) {
      return res.status(STATUS.NOT_FOUND).json({ message: MESSAGE.ROLE_NOT_FOUND });
    }
    return res.status(STATUS.OK).json({ setting, message: MESSAGE.ROLE_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};





module.exports = {
  /** GET */
  fetch,
  /** GET */

  /** POST */
  update,
  /** POST */
}
