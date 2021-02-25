const db = require('../models');

module.exports = {
    // Read Project
    findById: function (searchId, cb) {
        db.Project.findOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Create Project
    create: function (projectParams, cb) {
        db.Project.create({ ...projectParams },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Update Project
    updateById: function (searchId, projectParams, cb) {
        db.Project.updateOne({ _id: searchId }, { $set: { ...projectParams } },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Delete Project
    deleteById: function (searchId, cb) {
        db.Project.deleteOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    }
}