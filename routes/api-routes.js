const controllers = require('../controllers');
const userController = require('../controllers/userController');

const authenticateRequest = authHeader => {
    const authToken = (authHeader) ? authHeader.split(' ')[1] : null;

    return new Promise((resolve, reject) => {
        controllers.userController.authenticate(authToken, result => {
            resolve(result);
        });
    });
}

module.exports = function (app) {
    app.get('/api/authenticate/:authToken', (req, res) => {
        controllers.userController.authenticate(req.params.authToken, (result => {
            (result?.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        }));
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

    app.post('/api/user/:searchUsername', (req, res) => {
        controllers.userController.login(req.params.searchUsername, req.body, (result) => {
            (result.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    app.put('/api/user/:searchId', (req, res) => {
        controllers.userController.updateById(req.params.searchId, req.body, result => {
            (result.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    app.delete('/api/user/:searchId', (req, res) => {
        controllers.userController.deleteById(req.params.searchId, (result) => {
            (result.errors)
                ? res.status(400).json(result.errors)
                : res.status(200).json(result);
        });
    });

    // Project Routes
    app.get('/api/project/:searchId', (req, res) => {
        controllers.projectController.findById(req.params.searchId,
            (result) =>
                (result.errors)
                    ? res.status(400).json(result.errors)
                    : res.status(200).json(result));
    });

    app.post('/api/project', async (req, res) => {
        const authorization = await authenticateRequest(req.headers.authorization);

        if (authorization._id) {
            // Create project if authorized
            controllers.projectController.create(req.body, async result => {
                const addToUser = await controllers.userController.addProjectById(authorization._id, result._id);

                console.log(addToUser);
                (result.errors) ? res.status(400).json(result.errors) : res.status(200).json(result);
            });
        }
        else {
            res.status(400).json(authorization);
        }
    });

    app.put('/api/project/:searchId', (req, res) => {
        controllers.projectController.updateById(req.params.searchId, req.body,
            (result) =>
                (result.errors)
                    ? res.status(400).json(result.errors)
                    : res.status(200).json(result));
    });

    app.delete('/api/project/:searchId', (req, res) => {
        controllers.projectController.deleteById(req.params.searchId,
            (result) =>
                (result.errors)
                    ? res.status(400).json(result.errors)
                    : res.status(200).json(result));
    });

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
}