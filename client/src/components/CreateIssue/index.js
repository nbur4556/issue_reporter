import React, { useState } from 'react';
import CreateIssueForm from '../CreateIssueForm';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const CreateIssue = (props) => {
    const [issueData, setIssueData] = useState({
        name: '',
        body: '',
        category: '',
        // assigned: '',
        dueDate: ''
    });

    // Set issue data state for form inputs
    const handleUpdateInput = (e) => {
        const input = e.currentTarget;
        setIssueData({ ...issueData, [input.name]: input.value });
    }

    const handleSubmitForm = () => {
        setIssueData({ name: '', body: '', category: '', dueDate: '', });

        issueConnection.postQuery({ body: { selectProject: props.ui.selectProject, ...issueData } }).then(result => {
            if (result.status === 200)
                props.loadData();
        });
    }

    return <CreateIssueForm handleUpdateInput={handleUpdateInput} handleSubmitForm={handleSubmitForm} />;
}

export default CreateIssue;