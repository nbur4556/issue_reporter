import React, { useState } from 'react';

// Components
import { FormContainer, LabeledInput, SubmitButton } from '../Forms';
import ResultMessage from '../ResultMessage';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project')

const CreateProject = (props) => {
    const [projectCreated, setProjectCreated] = useState(null);
    const [projectData, setProjectData] = useState({ projectName: '' });

    const handleSetProjectData = e => {
        const input = e.currentTarget;
        setProjectData({ ...projectData, [input.name]: input.value })
    }

    const handleCreateProject = e => {
        e.preventDefault();
        projectConnection.postQuery({ body: projectData }).then(result => {
            if (result.status === 200) {
                props.handleLoadData();
                setProjectData({ projectName: '' })
                setProjectCreated(true);
            }
        }).catch(() => {
            setProjectCreated(false);
        });
    }

    return (
        <section>
            <FormContainer>
                <LabeledInput name="projectName" label="Name:" value={projectData.projectName} onChange={handleSetProjectData} />
                <SubmitButton onClick={handleCreateProject} />
            </FormContainer>

            <ResultMessage result={projectCreated} />
        </section>
    );
}

export default CreateProject;