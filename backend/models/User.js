const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Explicitly define the collection name
const UserModel = mongoose.model('User', userSchema, 'users'); // 'users' is the collection name in MongoDB

module.exports = UserModel;
