const db = require('../models');

module.exports = {
    // Read Project
    findById: function (searchId) {
        return new Promise((resolve, reject) => {
            db.Project.findOne({ _id: searchId },
                (err, result) => (err) ? reject(err) : resolve(result));
        });
    },

    // Create Project
    create: function (projectParams) {
        return db.Project.create({ ...projectParams });
    },

    // Update Project
    updateById: function (searchId, projectParams) {
        return new Promise((resolve, reject) => {
            db.Project.updateOne({ _id: searchId }, { $set: { ...projectParams } },
                (err, result) => (err) ? reject(err) : resolve(result));
        });
    },

    // Delete Project
    deleteById: function (searchId) {
        return new Promise((resolve, reject) => {
            db.Project.deleteOne({ _id: searchId },
                (err, result) => (err) ? resolve(err) : reject(result));
        });
    }
}