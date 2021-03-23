import React, { useState } from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import LabeledInput from '../Forms/LabeledInput';
import LabeledSelect from '../Forms/LabeledSelect';
import SubmitButton from '../Forms/SubmitButton';

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

    return (
        <FormContainer>
            <LabeledInput name="name" label="Name:" onChange={handleUpdateInput} />
            <LabeledInput name="body" label="Body:" onChange={handleUpdateInput} />
            <LabeledSelect name="category" label="Category:" onChange={handleUpdateInput}>
                <option></option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
            </LabeledSelect>
            {/* <LabeledInput name="assigned" label="Assigned:" onChange={handleUpdateInput} /> */}
            <LabeledInput name="dueDate" label="Due Date:" type="date" onChange={handleUpdateInput} />
            <SubmitButton onClick={handleSubmitForm} />
        </FormContainer>
    );
}

export default CreateIssue;