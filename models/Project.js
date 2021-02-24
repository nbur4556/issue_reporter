const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectName: { type: String, required: true },
    team: [{
        user: String,
        role: String
    }],
    categories: [],
    issues: []
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;