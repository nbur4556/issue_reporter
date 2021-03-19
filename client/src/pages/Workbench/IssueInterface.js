// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const setIssueStatus = (props) => {
    const { issueId } = props;
    return issueConnection.putQuery({ urlExtension: `/${issueId}`, body: { isOpen: props.status } });
}

const deleteIssue = (props) => {
    const { issueId } = props;
    return issueConnection.deleteQuery({ urlExtension: `/${issueId}` });
}

export { setIssueStatus, deleteIssue };