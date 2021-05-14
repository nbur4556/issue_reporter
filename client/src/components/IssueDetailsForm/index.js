import React, { useState } from 'react';

// Components
import { FormContainer, LabeledInput, LabeledSelect, CancelButton, SubmitButton } from '../Forms';

const IssueDetailsForm = (props) => {
    const [editIssueData, setEditIssueData] = useState();

    const handleUpdateInput = ({ currentTarget }) => {
        props.setEditSuccess(null);
        setEditIssueData({
            ...editIssueData,
            [currentTarget.getAttribute("name")]: currentTarget.value
        });
    }

    const submitForm = () => props.handleSubmitForm(editIssueData, setEditIssueData);
    const cancelForm = () => props.setIsEditing(false);

    return (
        <FormContainer>
            <LabeledInput
                name="name"
                label="Name:"
                placeholder={props.selectedIssue.name}
                onChange={handleUpdateInput}
                data-cy="name"
            />
            <LabeledInput
                name="body"
                label="Body:"
                placeholder={props.selectedIssue.body}
                onChange={handleUpdateInput}
                data-cy="body"
            />
            <LabeledSelect
                name="category"
                label="Category:"
                onChange={handleUpdateInput}
                placeholder={props.selectedIssue.category}
                data-cy="category">
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
            </LabeledSelect>
            {/* <LabeledInput name="assigned" label="Assigned:" onChange={handleUpdateInput} data-cy="name" /> */}
            <LabeledInput
                name="dueDate"
                label="Due Date:"
                type="date"
                onChange={handleUpdateInput}
            />
            <div>
                {/* Buttons */}
                <CancelButton onClick={cancelForm} />
                <SubmitButton onClick={submitForm} data-cy="submit" />
            </div>
        </FormContainer>
    );
}

export default IssueDetailsForm;