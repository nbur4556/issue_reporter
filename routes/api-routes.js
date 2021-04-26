const { PromiseProvider } = require('mongoose');
const controllers = require('../controllers');
const { userController, projectController, issueController } = controllers;

const authenticateRequest = authHeader => {
    const authToken = (authHeader) ? authHeader.split(' ')[1] : null;
    return userController.authenticate(authToken);
}

module.exports = function (app) {
    app.get('/api/authenticate/:authToken', async (req, res) => {
        const result = await userController.authenticate(req.params.authToken).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    // User Routes
    app.post('/api/user', async (req, res) => {
        const result = await userController.create(req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.post('/api/user/:searchUsername', async (req, res) => {
        const result = await userController.login(req.params.searchUsername, req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.put('/api/user/:searchId', async (req, res) => {
        const result = await userController.updateById(req.params.searchId, req.body).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    app.delete('/api/user/:searchId', async (req, res) => {
        const result = await userController.deleteById(req.params.searchId).catch(err => {
            res.status(400).json(err);
        });
        res.status(200).json(result);
    });

    // Project Routes
    app.get('/api/project', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        const user = await userController.getByIdIncludeProjects(authorization._id).catch(err => {
            res.status(400).json(err);
        });

        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(user.projects);
    });

    app.post('/api/project', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        // Create project
        const projectResult = await projectController.create(req.body).catch(err => {
            res.status(400).json(err);
        });

        // Add project to user
        userController.addProjectById(authorization._id, projectResult._id).catch(err => {
            res.status(400).json(err);
        });

        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(projectResult);
    });

    app.put('/api/project/:searchId', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        const projectResult = await projectController.updateById(req.params.searchId, req.body).catch(err => {
            res.status(400).json(err);
        });
        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(projectResult);
    });

    app.delete('/api/project/:searchId', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        const removeDataFrom = await Promise.all([
            projectController.findByIdPopulated(req.params.searchId),
            userController.removeProjectById(authorization._id, req.params.searchId)
        ]).catch(err => res.status(400).json(err));

        if (removeDataFrom[0]?.issues) {
            removeDataFrom[0].issues.forEach(({ _id }) => {
                issueController.deleteById(_id).catch(err => {
                    res.status(400).json(err);
                });
            });
        }

        // Delete project
        const projectResult = await projectController.deleteById(req.params.searchId).catch(err => {
            res.status(400).json(err);
        });
        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);

        res.setHeader('authentication', refreshToken);
        res.status(200).json(projectResult);
    });

    // Issue Routes
    app.get('/api/issue/byProject/:projectId', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        // Return if no project selected
        if (!req.params.projectId) {
            res.status(400).json({ msg: 'no project selected' });
            return;
        }

        const result = await projectController.findByIdPopulated(req.params.projectId).catch(err => {
            res.status(400).json(err);
        });

        // Set refresh token in header and send response
        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(result);
    });

    app.get('/api/issue/:searchId', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        const result = await issueController.findById(req.params.searchId).catch(err => {
            res.status(400).json(err);
        });

        // Set refresh token in header and send response
        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(result);
    });

    app.post('/api/issue', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        // Return if no project selected
        if (!req.body.selectProject) {
            res.status(400).json({ msg: 'no project selected' });
            return;
        }

        // Create Issue
        const result = await issueController.create(req.body).catch(err => {
            res.status(400).json(err);
        });

        // Add issue to project
        projectController.addIssueById(req.body.selectProject, result._id).catch(err => {
            res.status(400).json(err);
        });

        // Set refresh token in header and send response
        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(result);
    });

    app.put('/api/issue/:searchId', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        const result = await issueController.updateById(req.params.searchId, req.body).catch(err => {
            res.status(400).json(err);
        });

        // Set refresh token in header and send response
        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(result);
    });

    app.delete('/api/issue/:searchId', async (req, res) => {
        // User authorization
        const authorization = await authenticateRequest(req.headers.authorization);
        if (authorization.msg === 'failed') {
            res.status(400).json(authorization);
            return;
        }

        // Remove Issue from project
        await projectController.removeIssueById(req.body.selectProject, req.params.searchId).catch(err => {
            res.status(400).json(err);
        })

        const result = await issueController.deleteById(req.params.searchId).catch(err => {
            res.status(400).json(err);
        });

        // Set refresh token in header and send response
        const refreshToken = userController.getRefreshToken(req.headers.authorization.split(' ')[1]);
        res.setHeader('authentication', refreshToken);
        res.status(200).json(result);
    });
}