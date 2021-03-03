const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get salt used for bcrypt encryption
const generateSalt = cb => {
    bcrypt.genSalt(10)
        .then(salt => { cb(salt) })
        .catch(err => { cb(err) });
}

// Return encryption of input
const encryption = (encryptInput, cb) => {
    generateSalt(salt => {
        bcrypt.hash(encryptInput, salt)
            .then(hash => { cb(hash) })
            .catch(err => { cb(err) });
    });
}

// Compare input with encryption
const compareEncryption = (input, hash, cb) => {
    bcrypt.compare(input, hash).then(result => {
        cb(result);
    }).catch(err => {
        cb(err);
    });
}

// Return JWT token
const generateAuthToken = ({ ...tokenData }) => {
    return jwt.sign(tokenData, process.env.JWT_SECRET);
}

// Return decrypted JWT token
const authenticateAuthToken = (authToken) => {
    try {
        const tokenData = jwt.verify(authToken, process.env.JWT_SECRET);
        return tokenData;
    }
    catch {
        return null;
    }
}

// Check if password requirements are met
const checkMinimumRequirements = (password, confirmPassword) => {
    const minChar = 8;
    const numMatched = password.match(/\d+/g);

    if (password !== confirmPassword) { return false }
    else if (password.length < minChar) { return false }
    else if (password.toLowerCase() === password) { return false }
    else if (password.toUpperCase() === password) { return false }
    else if (numMatched === null) { return false }
    else { return true }
}

// Returned controller methods
module.exports = {
    // Read User
    login: function (searchUsername, userParams, cb) {
        db.User.findOne({ username: searchUsername }, (err, data) => {
            if (err) { cb(err) }

            // Compare input with encrypted password hash
            compareEncryption(userParams.password, data?.passwordHash, response => {
                if (response === true) {
                    const authToken = generateAuthToken({ id: data._id, username: data.username });
                    cb({ authToken: authToken });
                }
                else {
                    cb({ msg: 'failed' });
                }
            });
        });
    },

    authenticate: function (authToken, cb) {
        const tokenData = authenticateAuthToken(authToken);

        if (tokenData !== null) {
            db.User.findOne({ _id: tokenData.id }, (err, result) => {
                (err) ? cb(err) : cb(result);
            });
        }
    },

    // Create User
    create: function (userParams, cb) {
        if (!checkMinimumRequirements(userParams.password, userParams.confirmPassword)) {
            cb({ msg: 'failed' });
        }
        else {
            encryption(userParams.password, resultHash => {
                db.User.create({ ...userParams, passwordHash: resultHash },
                    (err, result) => (err) ? cb(err) : cb(result));
            });
        }
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