import React, { useState, useContext } from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import LabeledInput from '../Forms/LabeledInput';
import SubmitButton from '../Forms/SubmitButton';
import IconButton from '../IconButton';

// Contexts
import { UserDataContext } from '../../pages/Workbench';

const ProjectManager = (props) => {
    const userData = useContext(UserDataContext);

    const { dispatch, ACTIONS } = props.uiDispatcher;
    const { handleEditProject, handleDeleteProject } = props.projectInterface;

    const [editState, setEditState] = useState(false);
    const [editProjectId, setEditProjectId] = useState();
    const [editData, setEditData] = useState({
        projectName: null
    });

    const addProjectTab = (e) => dispatch(
        {
            type: ACTIONS.ADD_PROJECT_TAB, payload: {
                projectId: e.currentTarget.parentElement.parentElement?.getAttribute('data-projectId'),
                projectList: userData.projectList
            }
        }
    );

    const toggleEditState = (e) => {
        const projectId = e.currentTarget.parentElement.parentElement?.getAttribute('data-projectId');
        setEditProjectId(projectId);
        (editState) ? setEditState(false) : setEditState(true);
    }

    const handleEditData = (e) => {
        const input = e.currentTarget;
        setEditData({ ...editData, [input.name]: input.value });
    }

    const handleSubmitEditProject = (e) => {
        toggleEditState(e);
        handleEditProject(e, editProjectId, editData);
    }

    const renderProjects = (projectsList) => {
        const projectListItems = projectsList.map((project, index) => {
            return (
                <li key={index} data-projectid={project._id}>
                    {project.projectName}

                    <span>
                        <IconButton onClick={addProjectTab} alt="add button" cy='add-tab' />

                        <button
                            className="link-button"
                            onClick={toggleEditState}
                            data-cy="edit-project"
                        >Edit Project</button>
                        <button
                            className="link-button"
                            onClick={handleDeleteProject}
                            data-cy="delete-project"
                        >Delete Project</button>
                    </span>
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
        <section>
            <h3>Project Manager</h3>

            {(editState) ? renderEditForm() : null}

            <ul data-cy="project-manager-list">
                {(!editState) ? renderProjects(userData.projectList) : null}
            </ul>
        </section>
    )
}

export default ProjectManager;