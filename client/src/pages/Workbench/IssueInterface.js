// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const IssueInterface = (props) => {
    const handleSetIssueStatus = () => {
        const { isOpen, _id: issueId } = props.userData.issueList[props.userInterface.selectIssue];

        // Deselect issue when closed and displaying closed issues is set to false
        if (isOpen === true && props.userInterface.displayClosedIssue === false) props.setUserInterface({ ...props.userInterface, selectIssue: null });

        issueConnection.putQuery({ urlExtension: `/${issueId}`, body: { isOpen: !isOpen } }).then(() => {
            props.handleLoadData();
        });
    }

    const handleDeleteIssue = () => {
        const { _id: issueId } = props.userData.issueList[props.userInterface.selectIssue];

        issueConnection.deleteQuery({ urlExtension: `/${issueId}` }).then(() => {
            props.setUserInterface({ ...props.userInterface, selectIssue: null });
            props.handleLoadData();
        });
    }

    return { handleSetIssueStatus, handleDeleteIssue }
}

export default IssueInterface;