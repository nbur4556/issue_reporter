import React, { useState } from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import LabeledInput from '../Forms/LabeledInput';
import SubmitButton from '../Forms/SubmitButton';

const ProjectManager = (props) => {
    const [dispatch, ACTIONS] = props.uiDispatcher;

    const [editState, setEditState] = useState(false);
    const [editProjectId, setEditProjectId] = useState();
    const [editData, setEditData] = useState({
        projectName: null
    });

    const addProjectTab = (e) => dispatch(
        {
            type: ACTIONS.ADD_PROJECT_TAB, payload: {
                projectId: e.currentTarget.parentElement?.getAttribute('data-projectId'),
                projectList: props.projects
            }
        }
    );

    const toggleEditState = (e) => {
        const projectId = e.currentTarget.parentElement?.getAttribute('data-projectId');
        setEditProjectId(projectId);
        (editState) ? setEditState(false) : setEditState(true);
    }

    const handleEditData = (e) => {
        const input = e.currentTarget;
        setEditData({ ...editData, [input.name]: input.value });
    }

    const handleSubmitEditProject = (e) => {
        toggleEditState(e);
        props.editProject(e, editProjectId, editData);
    }

    const renderProjects = (projectsList) => {
        const projectListItems = projectsList.map((project, index) => {
            return (
                <li key={index} data-projectid={project._id}>
                    {project.projectName}
                    <button onClick={addProjectTab} data-cy='add-tab'>Add Tab</button>
                    <button onClick={toggleEditState} data-cy="edit-project">Edit Project</button>
                    <button onClick={props.deleteProject} data-cy="delete-project">Delete Project</button>
                </li>
            );
        });

        return projectListItems;
    }

    const renderEditForm = () => {
        return (
            <FormContainer>
                <LabeledInput name="projectName" label="Name:" onChange={handleEditData} cy="edit-field" />
                <SubmitButton onClick={handleSubmitEditProject} cy="submit-edit" />
            </FormContainer>
        );
    }

    return (
        <ul data-cy="project-manager-list">
            {(editState) ? renderEditForm() : renderProjects(props.projects)}
        </ul>
    )
}

export default ProjectManager;