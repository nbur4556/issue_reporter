module.exports = function (app) {
    app.get('/api/test', (req, res) => {
        res.send('GET test');
    });

    app.post('/api/test', (req, res) => {
        res.send('POST test')
    });

    app.put('/api/test', (req, res) => {
        res.send('PUT test');
    });

    app.delete('/api/test', (req, res) => {
        res.send('DELETE test');
    })
}