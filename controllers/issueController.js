const db = require('../models');

module.exports = {
    // Read Issue
    findById: function (searchId, cb) {
        db.Issue.findOne({ _id: searchId }, (err, result) => {
            if (err) { cb(err); }
            cb(result);
        });
    },

    // Create Issue
    create: function (issueParams) {
        db.Issue.create({
            name: issueParams.name,
            body: issueParams.body
        }, (err, result) => {
            if (err) { console.log(err); }
            if (result) { console.log(result); }
        });
    },

    // Update Issue
    updateById: function (searchId, issueParams) {
        db.Issue.updateOne({ _id: searchId }, {
            name: issueParams.name,
            body: issueParams.body
        }, (err, result) => {
            if (err) { console.log(err) };
            if (result) { console.log(result); }
        })
    },

    // Delete Issue
    deleteById: function (searchId) {
        db.Issue.deleteOne({ _id: searchId }, (err, result) => {
            if (err) { console.log(err); }
            if (result) { console.log(result); }
        })
    }
}