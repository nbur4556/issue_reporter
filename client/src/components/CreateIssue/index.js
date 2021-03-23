import React, { useState } from 'react';
import CreateIssueForm from '../CreateIssueForm';

const CreateIssue = () => {
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

    const handleSubmitForm = (e) => {
        console.log('submit form');
    }

    return <CreateIssueForm handleUpdateInput={handleUpdateInput} handleSubmitForm={handleSubmitForm} />;
}

export default CreateIssue;