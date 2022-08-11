const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema (
  {
    title: {type: String, required: true, minLength: 1, maxLength: 100},
    content: {type: String, required: true, minLength: 1, maxLength: 1000},
    timestamp: {type: Date, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Member', required: true},
  }
);

module.exports = mongoose.model('Message', MessageSchema);