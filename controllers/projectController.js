const db = require('../models');

module.exports = {
    // Read Project
    findById: function (searchId, cb) {
        db.Project.findOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    },

    // Create Project
    create: function () {
        console.log('placeholder')
    },

    // Update Project
    updateById: function () {
        console.log('placeholder')
    },

    // Delete Project
    deleteById: function (searchId, cb) {
        db.Project.deleteOne({ _id: searchId },
            (err, result) => (err) ? cb(err) : cb(result));
    }
}