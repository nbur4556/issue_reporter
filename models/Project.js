const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectName: String
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;