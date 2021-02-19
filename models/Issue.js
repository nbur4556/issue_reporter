const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    name: String,
    body: String,
    category: String,
    assigned: String,
    dueDate: String,
    comments: String,
    isOpen: Boolean
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;