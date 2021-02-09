const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    name: String,
    body: String
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;