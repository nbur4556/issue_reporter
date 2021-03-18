import React, { useState } from 'react';

const ProjectManager = (props) => {
    const [editState, setEditState] = useState(false);

    const renderProjects = (projectsList) => {
        const projectListItems = projectsList.map((project, index) => {
            return (
                <li key={index} data-projectid={project._id}>
                    {project.projectName}
                    <button onClick={props.addTab}>Add Tab</button>
                    <button>Edit Project</button>
                    <button onClick={props.deleteProject}>Delete Project</button>
                </li>
            );
        });

        return projectListItems;
    }

    return (
        <ul>
            {(editState) ? null : renderProjects(props.projects)}
        </ul>
    )
}

export default ProjectManager;