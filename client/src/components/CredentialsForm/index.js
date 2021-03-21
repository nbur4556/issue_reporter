import React from 'react';

// Components
import FormContainer from '../Forms/FormContainer';
import LabeledInput from '../Forms/LabeledInput';
import SubmitButton from '../Forms/SubmitButton';

const CredentialsForm = props => {
    return (
        <FormContainer>
            <LabeledInput name="username" label="Username:" onChange={props.handleOnChange} />
            <LabeledInput name="password" label="Password:" type="password" onChange={props.handleOnChange} />

            {(props.requireConfirm)
                ? <LabeledInput name="confirmPassword" label="Confirm Password:" type="password" onChange={props.handleOnChange} />
                : null}

            <SubmitButton onClick={props.handleSubmit} />
        </FormContainer>
    );
}

export default CredentialsForm;