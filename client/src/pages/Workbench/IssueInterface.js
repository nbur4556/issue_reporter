// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const IssueInterface = () => {
    const setIssueStatus = (props) => {
        const { issueId } = props;
        return issueConnection.putQuery({ urlExtension: `/${issueId}`, body: { isOpen: props.status } });
    }

    const handleDeleteIssue = (ui, setUi, handleLoadData, issueId) => {
        return issueConnection.deleteQuery({ urlExtension: `/${issueId}` }).then(() => {
            setUi({ ...ui, selectIssue: null });
            handleLoadData();
        });
    }

    return { setIssueStatus, handleDeleteIssue }
}

export default IssueInterface;