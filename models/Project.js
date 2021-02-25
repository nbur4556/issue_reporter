const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    projectName: { type: String, required: true },
    team: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: String
    }],
    categories: [],
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }]
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;