const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    name: String,
    body: String,
    category: String,
    assigned: String,
    dueDate: String,
    comments: String,
    isOpen: { type: Boolean, default: true }
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;