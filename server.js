const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
mongoose.connect('URI', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, dbConnection => {
    console.log(dbConnection);
});

// Routes
require('./routes/api-routes.js')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), './client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});