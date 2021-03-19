// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');
const issueConnection = new ApiConnection('/api/issue');

const loadData = () => {
    return Promise.all([
        projectConnection.getQuery(),
        issueConnection.getQuery()
    ]);
}

export default loadData