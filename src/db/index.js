const mongoose = require('mongoose')
const User = require('./user')

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

const startDB = ({ user, pwd, url, db }) => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}?authSource=admin`);
  
const models = {
  User,
}

module.exports = {
  startDB,
  models,
}