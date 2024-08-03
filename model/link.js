const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
