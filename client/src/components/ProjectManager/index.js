import React from 'react';

const ProjectManager = (props) => {
    return (
        <ul>
            {props.projects.map((project, index) => {
                return (
                    <li key={index} data-projectid={project._id}>
                        {project.projectName}
                        <button onClick={props.deleteProject}>Delete Project</button>
                    </li>
                );
            })}

            <p>Project Manager</p>
        </ul>
    )
}

export default ProjectManager;