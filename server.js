import express from 'express';
import path from 'path';

import apiRoutes from './routes/api-routes.js';

const app = express();
const PORT = 3001;

// Routes
apiRoutes();

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), './client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});