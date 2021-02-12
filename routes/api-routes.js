const controllers = require('../controllers');

module.exports = function (app) {
    // Issue Routes
    app.get('/api/issue/:searchId', (req, res) => {
        controllers.issueController.findById(req.params.searchId, (result) => {
            res.json(result);
        });
    });

    app.post('/api/issue', (req, res) => {

    });

    app.put('/api/issue', (req, res) => {

    });

    app.delete('/api/issue', (req, res) => {

    });
}