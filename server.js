import express from 'express';
import path from 'path';

const app = express();
const PORT = 3001;

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), './client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});