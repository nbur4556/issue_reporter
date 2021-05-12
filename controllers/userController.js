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
const generateAuthToken = ({ ...tokenData }, expirationTime = '15m') => {
    return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: expirationTime });
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
    getRefreshToken: function (authToken) {
        const tokenData = authenticateAuthToken(authToken);
        return (tokenData !== null) ? generateAuthToken({ id: tokenData.id, username: tokenData.username }) : null;

    },

    // Read User
    login: function (searchUsername, userParams) {
        return new Promise((resolve, reject) => {
            db.User.findOne({ username: searchUsername }).then(data => {
                // Compare input with encrypted password hash
                compareEncryption(userParams.password, data?.passwordHash, response => {
                    if (response === true) {
                        const authToken = generateAuthToken({ id: data._id, username: data.username });
                        resolve({ authToken: authToken });
                    }
                    else {
                        resolve({ msg: 'failed' });
                    }
                });
            });
        })
    },

    authenticate: function (authToken) {
        const tokenData = authenticateAuthToken(authToken);
        return (tokenData !== null) ? db.User.findOne({ _id: tokenData.id }) : ({ msg: 'failed' });
    },

    getByIdIncludeProjects: function (userId) {
        return db.User.findOne({ _id: userId }).populate('projects');
    },

    // Create User
    create: function (userParams) {
        return new Promise((resolve, reject) => {
            if (!userParams.username) {
                reject({ msg: 'failed' });
            }
            if (!checkMinimumRequirements(userParams.password, userParams.confirmPassword)) {
                reject({ msg: 'failed' });
            }
            else {
                encryption(userParams.password, resultHash => {
                    db.User.create({ ...userParams, passwordHash: resultHash })
                        .then(data => resolve({ authToken: generateAuthToken({ id: data._id, username: data.username }) }))
                        .catch(() => reject({ message: 'Error: Username already in use.' }));
                });
            }
        })
    },

    // Update User
    updateById: function (searchId, userParams) {
        return db.User.updateOne({ _id: searchId }, { $set: { ...userParams } });
    },

    addProjectById: function (searchId, projectId) {
        return db.User.updateOne({ _id: searchId }, { $push: { projects: projectId } });
    },

    removeProjectById: function (searchId, projectId) {
        return db.User.updateOne({ _id: searchId }, { $pull: { projects: projectId } });
    },

    // Delete User
    deleteById: function (searchId) {
        return db.User.deleteOne({ _id: searchId });
    }
}