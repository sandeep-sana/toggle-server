const Dao = require('../dao/role');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');


const fetchs = async (req, res) => {
  const { dbname: dbName, _id } = req.headers;
  let { query = null, projection = null, options = null } = req.query;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;
  try {
    const roles = await Dao.find(dbName, query, projection, options);
    return res.status(STATUS.OK).json({ roles });
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

  console.log('query', query);
  try {
    if(query?._id){
      const role = await Dao.findOneAndUpdate(dbName, query, projection, options);
      console.log('if', role);
      return res.status(STATUS.OK).json({ role, message: `Role ${MESSAGE.UPDATED_SUCCESSFULLY}` });
    }else{
      const role = await Dao.insertOne(dbName, query, projection, options);
      console.log('else', role)
      return res.status(STATUS.OK).json({ role, message: `Role ${MESSAGE.CREATED_SUCCESSFULLY}` });
    }
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};





module.exports = {
  /** GET */
  fetchs,
  /** GET */

  /** POST */
  update,
  /** POST */
}
