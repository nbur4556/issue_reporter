import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project')

const CreateProject = () => {
    const [projectData, setProjectData] = useState({
        projectName: ''
    });

    const handleSetProjectData = e => {
        const input = e.currentTarget;
        setProjectData({ ...projectData, [input.name]: input.value })
    }

    const handleCreateProject = e => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');

        projectConnection.postQuery({ body: projectData, authorization: authToken }).then(result => {
            (result.status === 200) ? console.log('Create Project Success') : console.log('Create Project Failed');
        });
    }

    return (
        <main>

            <Link to="/workbench">Back To Workbench</Link>

            <form>

                <label htmlFor="projectName">
                    Name:
                    <input id="projectName" name="projectName" type="text" onChange={handleSetProjectData} />
                </label>

                <button name="submit" onClick={handleCreateProject}>Submit</button>

            </form>

        </main>
    );
}

export default CreateProject;