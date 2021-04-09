// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');

const ProjectInterface = (props) => {
    const handleEditProject = (e, projectId, projectData) => {
        e.preventDefault();
        projectConnection.putQuery({ urlExtension: `/${projectId}`, body: projectData })
            .then(() => {
                props.handleLoadData();
            });
    }

    const handleDeleteProject = (e) => {
        projectConnection.deleteQuery({
            urlExtension: `/${e.currentTarget.parentElement.parentElement.getAttribute('data-projectid')}`
        }).then(() => {
            props.handleLoadData();
        });
    }

    return { handleEditProject, handleDeleteProject };
}

export default ProjectInterface;