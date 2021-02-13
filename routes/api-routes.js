const controllers = require('../controllers');

module.exports = function (app) {
    // Issue Routes
    app.get('/api/issue', (req, res) => {
        controllers.issueController.find((result) => {
            res.json(result);
        });
    });

    app.get('/api/issue/:searchId', (req, res) => {
        controllers.issueController.findById(req.params.searchId, (result) => {
            res.json(result);
        });
    });

    app.post('/api/issue', (req, res) => {
        controllers.issueController.create(req.body, (result) => {
            res.json(result);
        });
    });

    app.put('/api/issue/:searchId', (req, res) => {
        controllers.issueController.updateById(req.params.searchId, req.body, (result) => {
            res.json(result);
        });
    });

    app.delete('/api/issue/:searchId', (req, res) => {
        controllers.issueController.deleteById(req.params.searchId, (result) => {
            res.json(result);
        });
    });
}