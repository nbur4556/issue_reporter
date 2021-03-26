const db = require('../models');

module.exports = {
    // Read Issue
    findById: function (searchId) {
        return db.Issue.findOne({ _id: searchId });
    },

    // Create Issue
    create: function (issueParams) {
        return db.Issue.create({ ...issueParams });
    },

    // Update Issue
    updateById: function (searchId, issueParams) {
        return db.Issue.updateOne({ _id: searchId }, { $set: { ...issueParams } });
    },

    // Delete Issue
    deleteById: function (searchId) {
        return db.Issue.deleteOne({ _id: searchId });
    }
}