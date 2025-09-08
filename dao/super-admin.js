const Model = require('../schema/super-admin')

async function find(query, projection={}, options={}) {
  return await Model.find(query, projection, options);
}
async function findOne(query, projection={}, options={}) {
  return await Model.findOne(query, projection, options)
}
async function findOneAndUpdate(query, projection={}, options={}) {
  return await Model.findOneAndUpdate(query, projection, options)
}
async function update(query, projection={}, options={}) {
  return await Model.update(query, projection, options)
}
async function insertOne(query, projection={}, options={}) {
  return await Model.insertOne(query, projection, options)
}
async function aggregate(payload) {
  return await Model.aggregate(payload)
}

module.exports = {
  findOne,
  insertOne,
  find,
  aggregate,
  update,
  findOneAndUpdate,
}
