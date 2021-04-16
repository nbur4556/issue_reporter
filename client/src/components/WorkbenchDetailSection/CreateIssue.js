import React, { useState, useContext } from 'react';
import CreateIssueForm from '../CreateIssueForm';

// Components
import ResultMessage from '../ResultMessage';

// Contexts
import { UiContext, UiDispatcherContext } from '../../pages/Workbench';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const CreateIssue = (props) => {
    const ui = useContext(UiContext);
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    const { handleLoadIssues } = props.issueInterface;

    const [issueCreated, setIssueCreated] = useState(null);
    const [issueData, setIssueData] = useState({
        name: '',
        body: '',
        category: '',
        // assigned: '',
        dueDate: ''
    });

    // Set issue data state for form inputs
    const handleUpdateInput = (e) => {
        const input = e.currentTarget;
        setIssueCreated(null);
        setIssueData({ ...issueData, [input.name]: input.value });
    }

    const handleSubmitForm = () => {
        issueConnection.postQuery({ body: { selectProject: ui.selectProject, ...issueData } }).then(result => {
            if (result.status === 200) {
                handleLoadIssues();
                setIssueCreated(true);
                setIssueData({ name: '', body: '', category: '', dueDate: '', });
            }
        }).catch((err) => {
            console.log(err);
            setIssueCreated(false);
        });
    }

    const handleCancelForm = () => dispatch({ type: ACTIONS.DESELECT_DETAIL_SECTION });

    return (
        <section>
            <h3>Create Issue</h3>
            <CreateIssueForm formData={issueData}
                handleUpdateInput={handleUpdateInput}
                handleSubmitForm={handleSubmitForm}
                handleCancelForm={handleCancelForm}
            />

            <ResultMessage result={issueCreated}
                successMsg="Issue Created."
                errorMsg="Error: Unable to create issue."
            />
        </section>
    );
}

export default CreateIssue;