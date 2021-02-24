const db = require('../models');

module.exports = {
    // Read User

    // Create User
    create: function (userParams, cb) {
        db.User.create({ username: userParams.username },
            (err, result) => (err) ? cb(err) : cb(result));
    }

    // Update User

    // Delete User
}