// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');

const ProjectInterface = () => {
    const handleEditProject = (e, projectId, projectData, handleLoadData) => {
        e.preventDefault();
        projectConnection.putQuery({ urlExtension: `/${projectId}`, body: projectData })
            .then(() => {
                handleLoadData();
            });
    }

    const handleDeleteProject = (e, handleLoadData) => {
        projectConnection.deleteQuery({ urlExtension: `/${e.currentTarget.parentElement.getAttribute('data-projectid')}` })
            .then(() => {
                handleLoadData();
            });
    }

    return { handleEditProject, handleDeleteProject };
}

export default ProjectInterface;