const controllers = require('../controllers');

module.exports = function (app) {
    // Issue Routes
    app.get('/api/issue', (req, res) => {
        controllers.issueController.find((result) => {
            (result?.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    app.get('/api/issue/:searchId', (req, res) => {
        controllers.issueController.findById(req.params.searchId, (result) => {
            (result?.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    app.post('/api/issue', (req, res) => {
        controllers.issueController.create(req.body, (result) => {
            (result?.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    app.put('/api/issue/:searchId', (req, res) => {
        controllers.issueController.updateById(req.params.searchId, req.body, (result) => {
            (result?.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    app.delete('/api/issue/:searchId', (req, res) => {
        controllers.issueController.deleteById(req.params.searchId, (result) => {
            (result?.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    // User Routes
    app.get('/api/user/:searchId', (req, res) => {
        controllers.userController.findById(req.params.searchId, (result) => {
            (result?.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    app.post('/api/user', (req, res) => {
        controllers.userController.create(req.body, (result) => {
            (result.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });
}