import React, { useContext } from 'react';

// Components
import { FormContainer, LabeledInput, LabeledSelect, SubmitButton, CancelButton } from '../Forms';

const CreateIssueForm = (props) => {
    const { handleUpdateInput, handleSubmitForm } = props;

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
                <CancelButton onClick={props.handleCancelForm} />
                <SubmitButton onClick={submitForm} data-cy="submit" />
            </div>
        </FormContainer>
    );
}

export default CreateIssueForm;