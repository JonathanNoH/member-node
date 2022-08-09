const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    firstName: {type: String, required: true, maxLength: 100},
    lastName: {type: String, required: true, maxLength: 100},
    username: {type: String, required: true, maxLength: 150},
    password: {type: String, required: true, maxLength: 150},
    membership: {type: String, required: true, maxLength: 100}
  }
);

// virtuals
MemberSchema
.virtual('fullName')
.get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Member', MemberSchema)