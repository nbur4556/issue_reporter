import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import FormContainer from '../../components/Forms/FormContainer';
import LabeledInput from '../../components/Forms/LabeledInput';
import SubmitButton from '../../components/Forms/SubmitButton';

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

            <FormContainer>
                <LabeledInput name="projectName" label="Name:" onChange={handleSetProjectData} />
                <SubmitButton onClick={handleCreateProject} />
            </FormContainer>

            <p data-cy="success-message">{successMessage}</p>

        </main>
    );
}

export default CreateProject;