import React, { useState } from 'react';

// Components
import { FormContainer, LabeledInput, LabeledSelect, CancelButton, SubmitButton } from '../Forms';

const IssueDetailsForm = (props) => {
    const [editIssueData, setEditIssueData] = useState();

    const handleUpdateInput = ({ currentTarget }) => setEditIssueData({
        ...editIssueData,
        [currentTarget.getAttribute("name")]: currentTarget.value
    });
    const submitForm = () => console.log("Submit Form")
    const cancelForm = () => props.setIsEditing(false);

    return (
        <FormContainer>
            <LabeledInput name="name" label="Name:" onChange={handleUpdateInput} data-cy="name" />
            <LabeledInput name="body" label="Body:" onChange={handleUpdateInput} data-cy="body" />
            <LabeledSelect name="category" label="Category:" onChange={handleUpdateInput} data-cy="category">
                <option></option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
            </LabeledSelect>
            {/* <LabeledInput name="assigned" label="Assigned:" onChange={handleUpdateInput} data-cy="name" /> */}
            <LabeledInput name="dueDate" label="Due Date:" type="date" onChange={handleUpdateInput} />
            <div>
                {/* Buttons */}
                <CancelButton onClick={cancelForm} />
                <SubmitButton onClick={submitForm} data-cy="submit" />
            </div>
        </FormContainer>
    );
}

export default IssueDetailsForm;