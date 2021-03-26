// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');

const loadData = () => {
    return projectConnection.getQuery();
}

export default loadData