import React from 'react';

const ProjectManager = (props) => {
    return (
        <ul>
            {props.projects.map((project, index) => {
                return (
                    <li key={index}>{project.projectName}</li>
                );
            })}

            <p>Project Manager</p>
        </ul>
    )
}

export default ProjectManager;