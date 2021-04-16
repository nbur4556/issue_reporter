import React, { useState } from 'react';

import { FormContainer, LabeledInput, SubmitButton } from '../Forms';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project')

const CreateProject = () => {
    const [projectData, setProjectData] = useState();

    const handleSetProjectData = e => {
        const input = e.currentTarget;
        setProjectData({ ...projectData, [input.name]: input.value })
    }

    const handleCreateProject = e => {
        e.preventDefault();
        projectConnection.postQuery({ body: projectData }).then(result => {
            // (result.status === 200)
            //     ? setSuccessMessage(`Success! Issue "${projectData.projectName}" created.`)
            //     : setSuccessMessage('');
        });
    }

    return (
        <FormContainer>
            <LabeledInput name="projectName" label="Name:" onChange={handleSetProjectData} />
            <SubmitButton onClick={handleCreateProject} />
        </FormContainer>
    );
}

export default CreateProject;