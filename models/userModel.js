const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: true
    },
    activated: {
      type: Boolean,
      default: true
    },
    role: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true
    },
    locationId: {
      type: String
    },
    departmentId: {
      type: String
    },
    contractTypeId: {
      type: String
    },
    lineMangerId: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    firstLogin: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Users', userSchema);
