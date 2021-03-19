import React, { useState } from 'react';

const ProjectManager = (props) => {
    const [editState, setEditState] = useState(false);
    const [editProjectId, setEditProjectId] = useState();
    const [editData, setEditData] = useState({
        projectName: null
    });

    const toggleEditState = (e) => {
        const projectId = e.currentTarget.parentElement?.getAttribute('data-projectId');
        setEditProjectId(projectId);
        (editState) ? setEditState(false) : setEditState(true);
    }

    const handleEditData = (e) => {
        const input = e.currentTarget;
        setEditData({ ...editData, [input.name]: input.value });
    }

    const renderProjects = (projectsList) => {
        const projectListItems = projectsList.map((project, index) => {
            return (
                <li key={index} data-projectid={project._id}>
                    {project.projectName}
                    <button onClick={props.addTab}>Add Tab</button>
                    <button onClick={toggleEditState} data-cy="edit-project">Edit Project</button>
                    <button onClick={props.deleteProject} data-cy="delete-project">Delete Project</button>
                </li>
            );
        });

        return projectListItems;
    }

    const renderEditForm = () => {
        return (
            <form>
                <label htmlFor="projectName">
                    Name:
                    <input id="projectName" name="projectName" type="text" onChange={handleEditData} data-cy="edit-field" />
                </label>
                <button name="submit" data-cy="submit-edit" onClick={(e) => {
                    toggleEditState(e);
                    props.editProject(e, editProjectId, editData);
                }}>Submit</button>
            </form>
        );
    }

    return (
        <ul data-cy="project-manager-list">
            {(editState) ? renderEditForm() : renderProjects(props.projects)}
        </ul>
    )
}

export default ProjectManager;