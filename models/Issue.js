const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = Schema({
    name: { type: String, required: true },
    body: String,
    category: String,
    assigned: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: Date,
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    comments: [{
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        message: String
    }],
    isOpen: { type: Boolean, default: true }
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;