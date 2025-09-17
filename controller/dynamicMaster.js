const MasterDao = require('../dao/master');
const Dao = require('../dao/dynamicMaster');
const { STATUS } = require('../utils/status');
const { MESSAGE } = require('../utils/message');

const add = async (req, res) => {
  const { _id } = req.params;
  const { dbname: dbName } = req.headers;
  let { query = null, projection = null, options = null } = req.body;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const master = await MasterDao.findOne(dbName, { _id });
    const dynamicMaster = await Dao.insertOne(dbName, master, query, projection, options);
    if (!dynamicMaster) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.CREATED).json({ dynamicMaster, message: MESSAGE.MASTER_CREATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};
const update = async (req, res) => {
  const { _id, _listId } = req.params;
  const { dbname: dbName } = req.headers;
  let { query = null, projection = null, options = null } = req.body;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const master = await MasterDao.findOne(dbName, { _id });
    const dynamicMaster = await Dao.findOneAndUpdate(dbName, master, {...query, _id: _listId}, projection, options);
    if (!dynamicMaster) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.OK).json({ master, message: MESSAGE.MASTER_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};
const deleteDynamicMaster = async (req, res) => {
  const { _id, _listId } = req.params;
  const { dbname: dbName } = req.headers;
  // let { query = null, projection = null, options = null } = req.body;
  // query = query ? JSON.parse(query) : null;
  // projection = projection ? JSON.parse(projection) : null;
  // options = options ? JSON.parse(options) : null;

  try {
    const master = await MasterDao.findOne(dbName, { _id });
    const dynamicMaster = await Dao.deleteOne(dbName, master, { _id: _listId});
    if (!dynamicMaster) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.OK).json({ master, message: MESSAGE.MASTER.DELETED });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};


const fetchs = async (req, res) => {
  const { _id } = req.params;
  const { dbname: dbName } = req.headers;
  let { query = null, projection = null, options = null } = req.query;
  query = query ? JSON.parse(query) : null;
  projection = projection ? JSON.parse(projection) : null;
  options = options ? JSON.parse(options) : null;

  try {
    const master = await MasterDao.findOne(dbName, { ...query, _id });
    console.log('master', master)
    const dynamicMasters = await Dao.find(dbName, master, query, projection, options);
    console.log('dynamicMasters', dynamicMasters)
    if (!dynamicMasters) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
    }
    return res.status(STATUS.OK).json({ dynamicMasters });
  } catch (error) {
    console.error(error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
  }
};

// const fetch = async (req, res) => {
//   const { dbname: dbName } = req.headers;
//   const { _id } = req.params;
//   let { query = null, projection = null, options = null } = req.query;

//   query = query ? JSON.parse(query) : null;
//   projection = projection ? JSON.parse(projection) : null;
//   options = options ? JSON.parse(options) : null;

//   try {
//     const master = await Dao.findOne(dbName, { _id, ...query }, projection, options);
//     if (!master) {
//       return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
//     }
//     return res.status(STATUS.OK).json({ master });
//   } catch (error) {
//     console.error(error);
//     res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
//   }
// };

// const update = async (req, res) => {
//   const { dbname: dbName } = req.headers;
//   const { _id } = req.params;
//   let { query = null, projection = null, options = null } = req.body;
//   query = query ? JSON.parse(query) : null;
//   projection = projection ? JSON.parse(projection) : null;
//   options = options ? JSON.parse(options) : null;

//   try {
//     const master = await Dao.findOneAndUpdate(dbName, { ...query, _id }, projection, options);
//     if (!master) {
//       return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
//     }
//     return res.status(STATUS.CREATED).json({ master, message: MESSAGE.MASTER_UPDATED_SUCCESSFULLY });
//   } catch (error) {
//     console.error(error);
//     res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SERVER_ERROR });
//   }
// };





module.exports = {
  /** GET */
  // fetch,
  fetchs,
  /** GET */

  /** POST */
  add,
  update,
  /** POST */

  /** DELETE */
  deleteDynamicMaster,
  /** DELETE */
}
