import React, { useState, useContext } from 'react';
import CreateIssueForm from '../CreateIssueForm';

// Contexts
import { UiContext } from '../../pages/Workbench';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const CreateIssue = (props) => {
    const ui = useContext(UiContext);
    const { handleLoadIssues } = props.issueInterface;

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

        issueConnection.postQuery({ body: { selectProject: ui.selectProject, ...issueData } }).then(result => {
            if (result.status === 200)
                handleLoadIssues();
        });
    }

    return <CreateIssueForm handleUpdateInput={handleUpdateInput} handleSubmitForm={handleSubmitForm} />;
}

export default CreateIssue;