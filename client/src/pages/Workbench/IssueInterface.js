// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const IssueInterface = (props) => {
    const { userData, setUserData, userInterface, uiDispatcher } = props;
    const { dispatch, ACTIONS } = uiDispatcher

    const handleLoadIssues = () => {
        if (!userInterface.selectProject) { return }

        issueConnection.getQuery({ urlExtension: `/byProject/${userInterface.selectProject}` }).then(({ data }) => {
            setUserData({ ...userData, issueList: data.issues })
        });
    }

    const handleSetIssueStatus = () => {
        const { isOpen, _id: issueId } = userData.issueList[userInterface.selectIssue];

        // Deselect issue when closed and displaying closed issues is set to false
        if (isOpen === true && userInterface.displayClosedIssue === false) dispatch({ type: ACTIONS.DESELECT_ISSUE });

        issueConnection.putQuery({ urlExtension: `/${issueId}`, body: { isOpen: !isOpen } }).then(() => {
            handleLoadIssues();
        });
    }

    const handleDeleteIssue = () => {
        const { _id: issueId } = userData.issueList[userInterface.selectIssue];

        issueConnection.deleteQuery({ urlExtension: `/${issueId}`, body: { selectProject: userInterface.selectProject } })
            .then(() => {
                dispatch({ type: ACTIONS.DESELECT_ISSUE });
                handleLoadIssues();
            });
    }

    return { handleLoadIssues, handleSetIssueStatus, handleDeleteIssue }
}

export default IssueInterface;