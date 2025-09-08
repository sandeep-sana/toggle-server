const Dao = require('../dao/super-admin');
const { MESSAGE } = require('../utils/message');
const { STATUS } = require('../utils/status');


const saveAccount = async (req, res) => {
  let { query = null, projection = null, options = null } = req.body;
  try {
    query = query ? JSON.parse(query) : null;
    projection = projection ? JSON.parse(projection) : null;
    options = options ? JSON.parse(options) : null;
    const isEmailExist = await Dao.findOne({ 'company.email': query.company.email });
    if (isEmailExist) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.EMAIL_ALREADY_EXIST });
    }
    const account = await Dao.insertOne(query, projection, options);
    return res.status(STATUS.CREATED).json({ account, message: MESSAGE.ACCOUNT_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}
const fetchAccount = async (req, res) => {
  let { query = null, projection = null, options = null } = req.query;
  try {
    query = query ? JSON.parse(query) : null;
    projection = projection ? JSON.parse(projection) : null;
    options = options ? JSON.parse(options) : null;
    const account = await Dao.findOne(query, projection, options);
    if (!account) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.EMAIL_PASSWORD_NOT_CORRECT });
    }
    return res.status(STATUS.OK).json({ account, message: MESSAGE.LOGIN_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
}



module.exports = {
  saveAccount,
  fetchAccount,
}
