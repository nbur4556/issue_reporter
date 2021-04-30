import React from 'react';

// Components
import { FormContainer, LabeledInput, CancelButton, SubmitButton } from '../Forms';

const EditIssue = () => {
    const handleEditData = () => console.log('Handle Edit Data');
    const cancelEditProject = () => console.log('Cancel Edit Project');
    const handleSubmitEditProject = () => console.log('Handle Submit Edit Project');

    return (
        <FormContainer>
            <LabeledInput name="projectName" label="Name:" onChange={handleEditData} cy="edit-field" />
            <div>
                {/* Buttons */}
                <CancelButton onClick={cancelEditProject} />
                <SubmitButton onClick={handleSubmitEditProject} cy="submit-edit" />
            </div>
        </FormContainer>
    )
}

export default EditIssue;