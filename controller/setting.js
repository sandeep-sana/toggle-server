const Dao = require('../dao/setting');
const websiteDao = require('../dao/website');
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

const fetchWebsite = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;
  try {
    const setting = await Dao.findOne(dbName, query, projection, options);

    if (setting) {
      let query = {}
      const data = setting.toObject();
      for (const [key, value] of Object.entries(data)) {
        if (key !== '_id') {
          query._id = value;
          projection = {};
        }
      }
      const website = await websiteDao.findOne(dbName, query, projection, options);
      return res.status(STATUS.OK).json({ website });
    }

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
    const setting = await Dao.findOneAndUpdate(dbName, query, projection, options);
    return res.status(STATUS.OK).json({ message: `Setting ${MESSAGE.UPDATED_SUCCESSFULLY}` });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};





module.exports = {
  /** GET */
  fetch,
  fetchWebsite,
  /** GET */

  /** POST */
  update,
  /** POST */
}
