const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
  website: { type: String, required: true },
  description: { type: String, required: true },
  URL: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Password', passwordSchema);
