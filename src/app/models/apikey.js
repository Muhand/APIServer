const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Create a new Schema
 */
var APISchema = new Schema({
  //Properties of the model
  apikey: String,
  totalRequests: Number,
  totalPosts: Number,
  userID: Number
  // rate: Number,
  // limit: Number
});

/**
 * Export this module so we can pull it from another location
 */
module.exports = mongoose.model('apikey', APISchema);
