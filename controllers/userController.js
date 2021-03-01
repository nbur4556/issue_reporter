const db = require('../models');

module.exports = {
    // Read User
    findById: function (searchId, cb) {
        db.User.findOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    login: function (searchUsername, cb) {
        db.User.findOne({ username: searchUsername },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Create User
    create: function (userParams, cb) {
        db.User.create({ ...userParams },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Update User
    updateById: function (searchId, userParams, cb) {
        db.User.updateOne({ _id: searchId }, { $set: { ...userParams } },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Delete User
    deleteById: function (searchId, cb) {
        db.User.deleteOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    }
}