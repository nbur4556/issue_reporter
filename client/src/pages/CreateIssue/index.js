import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Components
import FormContainer from '../../components/Forms/FormContainer';
import LabeledInput from '../../components/Forms/LabeledInput';
import LabeledSelect from '../../components/Forms/LabeledSelect';
import SubmitButton from '../../components/Forms/SubmitButton';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const CreateIssue = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [issueData, setIssueData] = useState({
        name: '',
        body: '',
        category: '',
        // assigned: '',
        dueDate: ''
    });

    // Set issue data state for form inputs
    const handleSetIssueData = e => {
        const input = e.currentTarget;
        setIssueData({ ...issueData, [input.name]: input.value });
        setSuccessMessage('');
    }

    // Create an issue on submit
    const handleCreateIssue = e => {
        // e.preventDefault();

        clearFormData(e.currentTarget.parentElement);

        issueConnection.postQuery({ body: issueData }).then(result => {
            (result.status === 200)
                ? setSuccessMessage(`Success! Issue "${issueData.name}" created.`)
                : setSuccessMessage('');
        });
    }

    // Set all form input values and issue data to null
    const clearFormData = form => {
        setIssueData({
            name: '',
            body: '',
            category: '',
            // assigned: '',
            dueDate: '',
        });

        for (let formChild of form.children) {
            if (formChild.nodeName === 'LABEL') { formChild.children[0].value = null }
        }
    }

    return (
        <main>

            <Link to="/workbench">Back To Workbench</Link>

            <FormContainer>
                <LabeledInput name="name" label="Name:" onChange={handleSetIssueData} />
                <LabeledInput name="body" label="Body:" onChange={handleSetIssueData} />
                <LabeledSelect name="category" label="Category:" onChange={handleSetIssueData}>
                    <option></option>
                    <option value="Feature">Feature</option>
                    <option value="Bug">Bug</option>
                </LabeledSelect>
                {/* <LabeledInput name="assigned" label="Assigned:" onChange={handleSetIssueData} /> */}
                <LabeledInput name="dueDate" label="Due Date:" type="date" onChange={handleSetIssueData} />
                <SubmitButton onClick={handleCreateIssue} />
            </FormContainer>

            {(successMessage) ? <p>{successMessage}</p> : null}

        </main >
    );
}

export default CreateIssue;