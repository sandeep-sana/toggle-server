const { dbconnection } = require('../db-connection');
const { generateDynamicSchema } = require('../schema/dynamicMaster');

async function find(dbName, master, query = {}, projection = {}, options = {}) {
  const DynamicSchema = generateDynamicSchema(master.fields);
  const Dao = await dbconnection(dbName, master.name, DynamicSchema);
  return await Dao.find(query, projection, options);
}

async function findOne(dbName, master, query, projection = {}, options = {}) {
  const DynamicSchema = generateDynamicSchema(master.fields);
  const Dao = await dbconnection(dbName, master.name, DynamicSchema);
  return await Dao.findOne(query, projection, options)
}
async function findOneAndUpdate(dbName, master, query, projection = {}, options = {}) {
  const DynamicSchema = generateDynamicSchema(master.fields);
  const Dao = await dbconnection(dbName, master.name, DynamicSchema);
  console.log('query', query);
  console.log('projection', projection);
  console.log('options', options);
  return await Dao.findOneAndUpdate(query, projection, options)
}
async function update(dbName, master, query, projection = {}, options = {}) {
  const DynamicSchema = generateDynamicSchema(master.fields);
  const Dao = await dbconnection(dbName, master.name, DynamicSchema);
  return await Dao.update(query, projection, options)
}
async function  insertOne(dbName, master, query, projection = {}, options = {}) {
  const DynamicSchema = generateDynamicSchema(master.fields);
  const Dao = await dbconnection(dbName, master.name, DynamicSchema);
  console.log('333', query);
  return await Dao.insertOne(query, projection, options)

}
async function  deleteOne(dbName, master, query= {}, projection = {}, options = {}) {
  const DynamicSchema = generateDynamicSchema(master.fields);
  const Dao = await dbconnection(dbName, master.name, DynamicSchema);
  return await Dao.deleteOne(query, projection, options)

}
async function aggregate(dbName, master, payload) {
  const DynamicSchema = generateDynamicSchema(master.fields);
  const Dao = await dbconnection(dbName, master.name, DynamicSchema);
  return await Dao.aggregate(payload)
}

module.exports = {
  find,
  update,
  findOne,
  insertOne,
  aggregate,
  deleteOne,
  findOneAndUpdate,
}
