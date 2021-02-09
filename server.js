const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to Database
mongoose.connect(
    process.env.DB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
).then(({ connections }) => {
    console.log(`Connected on port ${connections[0].port}`);
});

// Routes
require('./routes/api-routes.js')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), './client/build/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});