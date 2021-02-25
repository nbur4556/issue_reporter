const db = require('../models');

module.exports = {
    // Read User
    findById: function (searchId, cb) {
        db.User.findOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Create User
    create: function (userParams, cb) {
        db.User.create({ username: userParams.username },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Update User
    updateById: function (searchId, userParams, cb) {
        db.User.findOne({ _id: searchId },
            (resultErr, resultUser) => {
                if (resultErr) { cb(resultErr) }

                db.User.updateOne({ _id: searchId }, {
                    $set: { username: userParams.username || resultUser.username }
                }, (err, result) => (err) ? cb(err) : cb(result));
            });
    },

    // Delete User
    deleteById: function (searchId, cb) {
        db.User.deleteOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    }
}