const db = require('../models');

module.exports = {
    // Read Issue
    findById: function (searchId, cb) {
        db.Issue.findOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Create Issue
    create: function (issueParams, cb) {
        db.Issue.create({
            name: issueParams.name,
            body: issueParams.body
        },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Update Issue
    updateById: function (searchId, issueParams, cb) {
        db.Issue.findOne({ _id: searchId },
            (resultErr, resultIssue) => {
                if (resultErr) { cb(resultErr) }

                db.Issue.updateOne({ _id: searchId },
                    {
                        $set: {
                            name: issueParams.name || resultIssue.name,
                            body: issueParams.body || resultIssue.body
                        }
                    },
                    (err, result) => (err) ? cb(err) : cb(result));
            });
    },

    // Delete Issue
    deleteById: function (searchId, cb) {
        db.Issue.deleteOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    }
}