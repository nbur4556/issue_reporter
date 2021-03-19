import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project')

const CreateProject = () => {
    const [successMessage, setSuccessMessage] = useState();
    const [projectData, setProjectData] = useState({
        projectName: ''
    });

    const handleSetProjectData = e => {
        const input = e.currentTarget;
        setProjectData({ ...projectData, [input.name]: input.value })
    }

    const handleCreateProject = e => {
        e.preventDefault();
        projectConnection.postQuery({ body: projectData }).then(result => {
            (result.status === 200)
                ? setSuccessMessage(`Success! Issue "${projectData.projectName}" created.`)
                : setSuccessMessage('');
        });
    }

    return (
        <main>

            <Link to="/workbench">Back To Workbench</Link>

            <form>

                <label htmlFor="projectName">
                    Name:
                    <input id="projectName" name="projectName" type="text" onChange={handleSetProjectData} data-cy="project-name" />
                </label>

                <button name="submit" onClick={handleCreateProject} data-cy="submit">Submit</button>
                <p data-cy="success-message">{successMessage}</p>

            </form>

        </main>
    );
}

export default CreateProject;