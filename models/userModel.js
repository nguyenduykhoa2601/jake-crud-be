const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: true
    },

    address: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      default: '',
    },
    age: {
      type: String,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Users', userSchema);
