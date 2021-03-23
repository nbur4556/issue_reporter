import React from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import LabeledInput from '../Forms/LabeledInput';
import LabeledSelect from '../Forms/LabeledSelect';
import SubmitButton from '../Forms/SubmitButton';

const CreateIssueForm = (props) => {
    const { handleUpdateInput, handleSubmitForm } = props;
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

export default CreateIssueForm;