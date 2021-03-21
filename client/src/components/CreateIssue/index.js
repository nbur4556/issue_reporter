import React from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import TextInput from '../Forms/TextInput';
import SubmitButton from '../Forms/SubmitButton';

const CreateIssue = () => {

    const handleUpdateInput = (e) => {
        console.log(e.currentTarget);
    }

    const handleSubmitForm = (e) => {
        console.log('submit form');
    }

    return (
        <FormContainer>
            {/* <TextInput label="Test" name="test" placeholder="test" onChange={handleUpdateInput} /> */}
            <SubmitButton onClick={handleSubmitForm} />
        </FormContainer>
    );
}

export default CreateIssue;