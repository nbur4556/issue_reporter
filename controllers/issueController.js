const db = require('../models');

module.exports = {
    // Read Issue
    find: function (cb) {
        db.Issue.find(
            (err, result) => (err) ? cb(err) : cb(result));
    },

    findById: function (searchId, cb) {
        db.Issue.findOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Create Issue
    create: function (issueParams, cb) {
        db.Issue.create({ ...issueParams },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Update Issue
    updateById: function (searchId, issueParams, cb) {
        db.Issue.updateOne({ _id: searchId }, { $set: { ...issueParams } },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Delete Issue
    deleteById: function (searchId, cb) {
        db.Issue.deleteOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    }
}