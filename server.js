const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require('./routes/api-routes.js')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), './client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});