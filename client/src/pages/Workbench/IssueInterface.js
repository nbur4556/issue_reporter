// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const IssueInterface = () => {
    const handleSetIssueStatus = (userData, ui, setUi, handleLoadData) => {
        const { isOpen, _id: issueId } = userData.issueList[ui.selectIssue];

        // Deselect issue when closed and displaying closed issues is set to false
        if (isOpen === true && ui.displayClosedIssue === false) setUi({ ...ui, selectIssue: null });

        issueConnection.putQuery({ urlExtension: `/${issueId}`, body: { isOpen: !isOpen } }).then(() => {
            handleLoadData();
        });
    }

    const handleDeleteIssue = (ui, setUi, handleLoadData, issueId) => {
        return issueConnection.deleteQuery({ urlExtension: `/${issueId}` }).then(() => {
            setUi({ ...ui, selectIssue: null });
            handleLoadData();
        });
    }

    return { handleSetIssueStatus, handleDeleteIssue }
}

export default IssueInterface;