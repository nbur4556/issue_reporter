const db = require('../models');
const bcrypt = require('bcrypt');

const generateSalt = cb => {
    bcrypt.genSalt(10)
        .then(salt => { cb(salt) })
        .catch(err => { cb(err) });
}

const encryption = (encryptInput, cb) => {
    generateSalt(salt => {
        bcrypt.hash(encryptInput, salt)
            .then(hash => { cb(hash) })
            .catch(err => { cb(err) });
    });
}

const compareEncryption = (input, hash, cb) => {
    bcrypt.compare(input, hash).then(result => {
        cb(result);
    }).catch(err => {
        cb(err);
    });
}

module.exports = {
    // Read User
    findById: function (searchId, cb) {
        db.User.findOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    login: function (searchUsername, userParams, cb) {
        db.User.findOne({ username: searchUsername },
            (err, data) => {
                if (err) { cb(err) }

                // Compare input with encrypted password hash
                compareEncryption(userParams.password, data.passwordHash, response => {
                    (response === true) ? cb(data) : cb({ msg: 'failed' });
                });
            });
    },

    // Create User
    create: function (userParams, cb) {
        encryption(userParams.password, resultHash => {
            db.User.create({ ...userParams, passwordHash: resultHash },
                (err, result) => (err) ? cb(err) : cb(result));
        });
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