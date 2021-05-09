import React, { useState, useContext } from 'react';

// Components
import { FormContainer, LabeledInput, SubmitButton, CancelButton } from '../Forms';
import ResultMessage from '../ResultMessage';

// Contexts
import { UiDispatcherContext } from '../../pages/Workbench';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project')

const CreateProject = (props) => {
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    const [projectCreated, setProjectCreated] = useState(null);
    const [projectData, setProjectData] = useState({ projectName: '' });

    const handleSetProjectData = e => {
        const input = e.currentTarget;
        setProjectCreated(null);
        setProjectData({ ...projectData, [input.name]: input.value })
    }

    const handleCreateProject = e => {
        e.preventDefault();
        projectConnection.postQuery({ body: projectData }).then(result => {
            if (result.status === 200) {
                props.handleLoadData();
                setProjectData({ projectName: '' })
                setProjectCreated(true);
                dispatch({ type: ACTIONS.TOGGLE_PROJECT_MANAGER });
            }
        }).catch(() => {
            setProjectCreated(false);
        });
    }

    const cancelCreateProject = () => dispatch({ type: ACTIONS.TOGGLE_PROJECT_MANAGER });

    return (
        <section>
            <h3>Create Project</h3>
            <FormContainer>
                <LabeledInput name="projectName" label="Name:" value={projectData.projectName} onChange={handleSetProjectData} />
                <p>
                    <CancelButton onClick={cancelCreateProject} />
                    <SubmitButton onClick={handleCreateProject} />
                </p>
            </FormContainer>

            <ResultMessage result={projectCreated} />
        </section>
    );
}

export default CreateProject;