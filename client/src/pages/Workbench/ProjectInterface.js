// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');

const ProjectInterface = (props) => {
    const { dispatch, ACTIONS } = props.uiDispatcher;

    const handleEditProject = (e, projectId, projectData) => {
        e.preventDefault();

        projectConnection.putQuery({ urlExtension: `/${projectId}`, body: projectData })
            .then(() => props.handleLoadData());
    }

    const handleDeleteProject = (projectId) => {
        projectConnection.deleteQuery({ urlExtension: `/${projectId}` })
            .then(() => {
                props.ui.projectTabs.forEach((tab, index) => {
                    (projectId === tab._id)
                        ? dispatch({ type: ACTIONS.REMOVE_PROJECT_TAB, payload: { tabIndex: index } })
                        : console.log('not found');
                })
                props.handleLoadData()
            });
    }

    return { handleEditProject, handleDeleteProject };
}

export default ProjectInterface;