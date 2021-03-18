import React, { useState } from 'react';

const ProjectManager = (props) => {
    const [editState, setEditState] = useState(false);

    const toggleEditState = () => {
        (editState) ? setEditState(false) : setEditState(true);
    }

    const renderProjects = (projectsList) => {
        const projectListItems = projectsList.map((project, index) => {
            return (
                <li key={index} data-projectid={project._id}>
                    {project.projectName}
                    <button onClick={props.addTab}>Add Tab</button>
                    <button onClick={toggleEditState}>Edit Project</button>
                    <button onClick={props.deleteProject}>Delete Project</button>
                </li>
            );
        });

        return projectListItems;
    }

    const editProjects = () => {
        return <p onClick={toggleEditState}>Edit Projects</p>
    }

    return (
        <ul>
            {(editState) ? editProjects() : renderProjects(props.projects)}
        </ul>
    )
}

export default ProjectManager;