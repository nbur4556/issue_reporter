const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;