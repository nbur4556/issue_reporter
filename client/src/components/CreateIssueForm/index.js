import React from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import LabeledInput from '../Forms/LabeledInput';
import LabeledSelect from '../Forms/LabeledSelect';
import SubmitButton from '../Forms/SubmitButton';

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
            <LabeledInput name="name" label="Name:" onChange={handleUpdateInput} />
            <LabeledInput name="body" label="Body:" onChange={handleUpdateInput} />
            <LabeledSelect name="category" label="Category:" onChange={handleUpdateInput}>
                <option></option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
            </LabeledSelect>
            {/* <LabeledInput name="assigned" label="Assigned:" onChange={handleUpdateInput} /> */}
            <LabeledInput name="dueDate" label="Due Date:" type="date" onChange={handleUpdateInput} />
            <SubmitButton onClick={submitForm} />
        </FormContainer>
    );
}

export default CreateIssueForm;