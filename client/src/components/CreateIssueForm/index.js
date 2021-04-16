import React from 'react';

// Components
import { FormContainer, LabeledInput, LabeledSelect, SubmitButton, CancelButton } from '../Forms';

const CreateIssueForm = (props) => {
    const { formData, handleUpdateInput, handleSubmitForm } = props;

    // Clear all inputs and submit
    const submitForm = (e) => {
        const formContainer = e.currentTarget.parentElement;

        for (let formChild of formContainer.children) {
            if (formChild.nodeName === 'LABEL') { formChild.children[0].value = null }
        };

        handleSubmitForm();
    }

    return (
        <FormContainer>
            <LabeledInput name="name" label="Name:" value={formData.name} onChange={handleUpdateInput} />
            <LabeledInput name="body" label="Body:" value={formData.body} onChange={handleUpdateInput} />
            <LabeledSelect name="category" label="Category:" value={formData.category} onChange={handleUpdateInput}>
                <option></option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
            </LabeledSelect>
            {/* <LabeledInput name="assigned" label="Assigned:" onChange={handleUpdateInput} data-cy="name" /> */}
            <LabeledInput name="dueDate" label="Due Date:" value={formData.dueDate} type="date" onChange={handleUpdateInput} />
            <div>
                {/* Buttons */}
                <CancelButton onClick={props.handleCancelForm} />
                <SubmitButton onClick={submitForm} data-cy="submit" />
            </div>
        </FormContainer>
    );
}

export default CreateIssueForm;