// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const IssueInterface = (props) => {
    const { userData, userInterface, setUserInterface, handleLoadData } = props;

    const handleSetIssueStatus = () => {
        const { isOpen, _id: issueId } = userData.issueList[userInterface.selectIssue];

        // Deselect issue when closed and displaying closed issues is set to false
        if (isOpen === true && userInterface.displayClosedIssue === false) setUserInterface({ ...userInterface, selectIssue: null });

        issueConnection.putQuery({ urlExtension: `/${issueId}`, body: { isOpen: !isOpen } }).then(() => {
            handleLoadData();
        });
    }

    const handleDeleteIssue = () => {
        const { _id: issueId } = userData.issueList[userInterface.selectIssue];

        console.log(userInterface.selectProject);

        issueConnection.deleteQuery({ urlExtension: `/${issueId}`, body: { selectProject: userInterface.selectProject } })
            .then(() => {
                setUserInterface({ ...userInterface, selectIssue: null });
                handleLoadData();
            });
    }

    return { handleSetIssueStatus, handleDeleteIssue }
}

export default IssueInterface;