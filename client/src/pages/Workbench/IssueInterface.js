// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const getSelectIssue = (issueList, selectIssue) => {
    for (const issue of issueList) {
        if (issue._id === selectIssue) {
            return issue;
        }
    }
}

const IssueInterface = ({ userData, userDataDispatcher, ui, uiDispatcher }) => {
    const handleLoadIssues = () => {
        if (!ui.selectProject) { return }

        issueConnection.getQuery({ urlExtension: `/byProject/${ui.selectProject}` })
            .then(({ data }) => {
                userDataDispatcher.dispatch({
                    type: userDataDispatcher.ACTIONS.LOAD_ISSUES,
                    payload: { issues: data.issues }
                });
            });
    }

    const handleSetIssueStatus = (issue) => {
        const { isOpen, _id: issueId } = issue || getSelectIssue(userData.issueList, ui.selectIssue);

        // Deselect issue when closed and displaying closed issues is set to false
        if (isOpen === true && ui.displayClosedIssue === false)
            uiDispatcher.dispatch({ type: uiDispatcher.ACTIONS.DESELECT_ISSUE });

        issueConnection.putQuery({ urlExtension: `/${issueId}`, body: { isOpen: !isOpen } }).then(() => {
            handleLoadIssues();
        });
    }

    const handleDeleteIssue = () => {
        const { _id: issueId } = getSelectIssue(userData.issueList, ui.selectIssue);

        issueConnection.deleteQuery({ urlExtension: `/${issueId}`, body: { selectProject: ui.selectProject } })
            .then(() => {
                uiDispatcher.dispatch({ type: uiDispatcher.ACTIONS.DESELECT_ISSUE });
                handleLoadIssues();
            });
    }

    return { handleLoadIssues, handleSetIssueStatus, handleDeleteIssue }
}

export default IssueInterface;