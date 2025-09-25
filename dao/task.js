const { dbconnection } = require('../db-connection');
const Schema = require('../schema/task');
const { SCHEMA } = require('../utils/schema');

async function find(dbName, query={}, projection = {}, options = {}) {
  const Dao = await dbconnection(dbName, SCHEMA.TASK, Schema);
  return await Dao.find(query, projection, options);
}

async function findOne(dbName, query, projection = {}, options = {}) {
  const Dao = await dbconnection(dbName, SCHEMA.TASK, Schema);
  return await Dao.findOne(query, projection, options)
}
async function findOneAndUpdate(dbName, query, projection = {}, options = {}) {
  const Dao = await dbconnection(dbName, SCHEMA.TASK, Schema);
  console.log(query, projection)
  return await Dao.findOneAndUpdate(query, projection, options)
}
async function update(dbName, query, projection = {}, options = {}) {
  const Dao = await dbconnection(dbName, SCHEMA.TASK, Schema);
  return await Dao.update(query, projection, options)
}
async function insertOne(dbName, query, projection = {}, options = {}) {
  const Dao = await dbconnection(dbName, SCHEMA.TASK, Schema);
  return await Dao.insertOne(query, projection, options)
}
async function aggregate(dbName, payload) {
  const Dao = await dbconnection(dbName, SCHEMA.TASK, Schema);
  return await Dao.aggregate(payload)
}

module.exports = {
  find,
  update,
  findOne,
  insertOne,
  aggregate,
  findOneAndUpdate,
}
