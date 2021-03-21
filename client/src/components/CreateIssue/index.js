import React from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import TextInput from '../Forms/TextInput'

const CreateIssue = () => {

    const handleUpdateInput = (e) => {
        console.log(e.currentTarget);
    }

    return (
        <FormContainer>
            <TextInput label="Test" name="test" placeholder="test" onChange={handleUpdateInput} />
        </FormContainer>
    );
}

export default CreateIssue;