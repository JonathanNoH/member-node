const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { DateTime } = require('luxon');

const MessageSchema = new Schema (
  {
    title: {type: String, required: true, minLength: 1, maxLength: 100},
    content: {type: String, required: true, minLength: 1, maxLength: 1000},
    timestamp: {type: Date, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Member', required: true},
  }
);

MessageSchema.virtual('formattedDate').get(function() {
  return DateTime.fromISO(this.timestamp.toISOString()).toLocaleString(DateTime.DATETIME_FULL);
});

module.exports = mongoose.model('Message', MessageSchema);