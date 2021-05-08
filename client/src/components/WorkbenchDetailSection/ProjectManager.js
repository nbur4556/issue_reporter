import React, { useState, useContext } from 'react';

// Components
import EditProject from './EditProject';
import IconButton from '../IconButton';
import DeleteConfirmation from '../DeleteConfirmation';

// Contexts
import { UserDataContext, UiDispatcherContext } from '../../pages/Workbench';

const ProjectManager = (props) => {
    const userData = useContext(UserDataContext);
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    const { handleDeleteProject } = props.projectInterface;

    const [displayDeleteMsg, setDisplayDeleteMsg] = useState(null);
    const [editProjectId, setEditProjectId] = useState(null);

    const toggleCreateProject = () => dispatch({ type: ACTIONS.TOGGLE_CREATE_PROJECT });
    const addProjectTab = (e) => dispatch({
        type: ACTIONS.ADD_PROJECT_TAB, payload: {
            projectId: e.currentTarget.parentElement.parentElement.parentElement?.getAttribute('data-projectId'),
            projectList: userData.projectList
        }
    });

    const getEditProject = ({ currentTarget }) => {
        const projectId = currentTarget.parentElement.parentElement.parentElement?.getAttribute('data-projectId');
        setEditProjectId(projectId);
    }

    const confirmDeleteProject = (currentTarget, index) => {
        const itemElement = currentTarget.parentElement.parentElement.parentElement.children[index];
        handleDeleteProject(itemElement.getAttribute('data-projectid'));
        setDisplayDeleteMsg(null);
    }

    return (
        <section>
            <h3>Project Manager</h3>
            {(editProjectId === null)
                ? <button className="link-button" onClick={toggleCreateProject} data-cy="create-project">Create Project</button>
                : null}

            {(editProjectId)
                ? <EditProject
                    projectId={editProjectId}
                    setEditProjectId={setEditProjectId}
                    projectInterface={props.projectInterface} />
                : null}

            <ul data-cy="project-manager-list">
                {(editProjectId === null) ? userData.projectList.map((project, index) => {
                    return (
                        <li key={index} data-projectid={project._id}>
                            <div className="list-content">
                                {project.projectName}

                                <span>
                                    <IconButton
                                        iconName="add"
                                        onClick={addProjectTab}
                                        alt="add tab button"
                                        tooltip={{ text: 'Open new project tab', width: '11rem' }}
                                        cy="add-tab"
                                    />

                                    <button className="link-button" onClick={getEditProject}
                                        data-cy="edit-project"
                                    >
                                        Edit
                                    </button>

                                    <button className="link-button" onClick={() => setDisplayDeleteMsg(index)}
                                        data-cy="delete-project"
                                    >
                                        Delete
                                    </button>
                                </span>
                            </div>

                            {/* Display Delete Message In List */}
                            {(index === displayDeleteMsg)
                                ? <DeleteConfirmation type="project"
                                    onConfirm={(e) => confirmDeleteProject(e.currentTarget, index)}
                                    onReject={() => setDisplayDeleteMsg(null)}
                                />
                                : null}
                        </li>
                    );
                }) : null}
            </ul>
        </section>
    )
}

export default ProjectManager;