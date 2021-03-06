const db = require('../models');

module.exports = {
    // Read Project
    findById: function (searchId) {
        return db.Project.findOne({ _id: searchId }).exec();
    },

    findByIdPopulated: function (searchId) {
        return db.Project.findOne({ _id: searchId }).populate('issues');
    },

    // Create Project
    create: function (projectParams) {
        return db.Project.create({ ...projectParams });
    },

    // Update Project
    updateById: function (searchId, projectParams) {
        // Remove empty parameters
        for (const key in projectParams) {
            if (!projectParams[key]) {
                delete projectParams[key];
            }
        }

        return db.Project.updateOne({ _id: searchId }, { $set: { ...projectParams } });
    },

    addIssueById: function (searchId, issueId) {
        return db.Project.updateOne({ _id: searchId }, { $push: { issues: issueId } });
    },

    removeIssueById: function (searchId, issueId) {
        return db.Project.updateOne({ _id: searchId }, { $pull: { issues: issueId } });
    },

    // Delete Project
    deleteById: function (searchId) {
        return db.Project.deleteOne({ _id: searchId });
    }
}