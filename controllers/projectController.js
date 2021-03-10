const db = require('../models');

module.exports = {
    // Read Project
    findById: function (searchId) {
        return db.Project.findOne({ _id: searchId }).exec();
    },

    // Create Project
    create: function (projectParams) {
        return db.Project.create({ ...projectParams });
    },

    // Update Project
    updateById: function (searchId, projectParams) {
        return db.Project.updateOne({ _id: searchId }, { $set: { ...projectParams } });
    },

    // Delete Project
    deleteById: function (searchId) {
        return db.Project.deleteOne({ _id: searchId });
    }
}