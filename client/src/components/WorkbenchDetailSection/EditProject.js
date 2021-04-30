import React, { useState } from 'react';

// Components
import { FormContainer, LabeledInput, CancelButton, SubmitButton } from '../Forms';

const EditProject = (props) => {
    const [editData, setEditData] = useState({ projectName: null });
    const { handleEditProject } = props.projectInterface;

    const handleEditData = ({ currentTarget }) => setEditData({ ...editData, [currentTarget.name]: currentTarget.value });

    const cancelEditProject = () => props.setEditProjectId(null);

    const handleSubmitEditProject = (e) => {
        props.setEditProjectId(null);
        handleEditProject(e, props.projectId, editData);
    }

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

export default EditProject;