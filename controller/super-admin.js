const Dao = require('../dao/super-admin');
const { STATUS } = require('../utils/status.utils');


const saveAccount = async (req, res) => {
  let { query = null, projection = null, options = null } = req.body;
  try {
    query = query ? JSON.parse(query) : null;
    projection = projection ? JSON.parse(projection) : null;
    options = options ? JSON.parse(options) : null;
    const account = await Dao.insertOne(query, projection, options);
    res.status(STATUS.OK).json({ account });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
}
const fetchAccount = async (req, res) => {
  let { query = null, projection = null, options = null } = req.query;
  try {
    query = query ? JSON.parse(query) : null;
    projection = projection ? JSON.parse(projection) : null;
    options = options ? JSON.parse(options) : null;
    const account = await Dao.findOne(query, projection, options);
    console.log(account)
    res.status(STATUS.OK).json({ account });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
}



module.exports = {
  saveAccount,
  fetchAccount,
}
