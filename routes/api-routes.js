const controllers = require('../controllers');

const authenticateRequest = authHeader => {
    const authToken = (authHeader) ? authHeader.split(' ')[1] : null;
    return controllers.userController.authenticate(authToken);
}

module.exports = function (app) {
    app.get('/api/authenticate/:authToken', async (req, res) => {
        const result = await controllers.userController.authenticate(req.params.authToken).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    // User Routes
    app.post('/api/user', async (req, res) => {
        const result = await controllers.userController.create(req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.post('/api/user/:searchUsername', async (req, res) => {
        const result = await controllers.userController.login(req.params.searchUsername, req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.put('/api/user/:searchId', async (req, res) => {
        const result = await controllers.userController.updateById(req.params.searchId, req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.delete('/api/user/:searchId', async (req, res) => {
        const result = await controllers.userController.deleteById(req.params.searchId).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    // Project Routes
    app.get('/api/project', async (req, res) => {
        const authorization = await authenticateRequest(req.headers.authorization);

        if (authorization._id) {
            const user = await controllers.userController.getByIdIncludeProjects(authorization._id).catch(err => {
                res.status(400).json(err);
            });
            res.status(200).json(user.projects);
        }
        else {
            res.status(400).json(authorization);
        }
    });

    app.post('/api/project', async (req, res) => {
        const authorization = await authenticateRequest(req.headers.authorization);

        if (authorization._id) {
            // Create project
            const projectResult = await controllers.projectController.create(req.body).catch(err => {
                res.status(400).json(err);
            });

            // Add project to user
            controllers.userController.addProjectById(authorization._id, projectResult._id).catch(err => {
                res.status(400).json(err);
            });

            res.status(200).json(projectResult);
        }
        else {
            res.status(400).json(authorization);
        }
    });

    app.put('/api/project/:searchId', async (req, res) => {
        const authorization = await authenticateRequest(req.headers.authorization);

        if (authorization._id) {
            const projectResult = await controllers.projectController.updateById(req.params.searchId, req.body).catch(err => {
                res.status(400).json(err);
            });
            res.status(200).json(projectResult);
        }
        else {
            res.status(400).json(authorization);
        }
    });

    app.delete('/api/project/:searchId', async (req, res) => {
        const authorization = await authenticateRequest(req.headers.authorization);

        if (authorization._id) {
            // Remove project from user
            await controllers.userController.removeProjectById(authorization._id, req.params.searchId).catch(err => {
                res.status(400).json(err);
            });

            // Delete project
            const projectResult = await controllers.projectController.deleteById(req.params.searchId).catch(err => {
                res.status(400).json(err);
            });

            res.status(200).json(projectResult);
        }
        else {
            res.status(400).json(authorization);
        }
    });

    // Issue Routes
    app.get('/api/issue', async (req, res) => {
        const result = await controllers.issueController.find().catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.get('/api/issue/:searchId', async (req, res) => {
        const result = await controllers.issueController.findById(req.params.searchId).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.post('/api/issue', async (req, res) => {
        const result = await controllers.issueController.create(req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.put('/api/issue/:searchId', async (req, res) => {
        const result = await controllers.issueController.updateById(req.params.searchId, req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.delete('/api/issue/:searchId', async (req, res) => {
        const result = await controllers.issueController.deleteById(req.params.searchId).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });
}