// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');

const editProject = (props) => {
    const { projectId, projectData } = props;
    return projectConnection.putQuery({ urlExtension: `/${projectId}`, body: projectData });
}

const deleteProject = (props) => {
    const { projectId } = props;
    return projectConnection.deleteQuery({ urlExtension: `/${projectId}` });
}

export { editProject, deleteProject };