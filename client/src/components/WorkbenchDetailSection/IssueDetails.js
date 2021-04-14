import React, { useState, useEffect, useContext } from 'react';

// Components
import IssueDetailsList from '../IssueDetailsList';
import IssueDetailsForm from '../IssueDetailsForm';

// Contexts
import { UserDataContext, UiContext } from '../../pages/Workbench';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const IssueDetails = props => {
    const userData = useContext(UserDataContext);
    const ui = useContext(UiContext);

    const { handleLoadIssues } = props.issueInterface;

    const [isEditing, setIsEditing] = useState(true);
    const [displayDeleteMsg, setDisplayDeleteMsg] = useState(false);

    const getSelectIssue = (issueList, selectIssue) => {
        for (const issue of issueList) {
            if (issue._id === selectIssue) {
                return issue;
            }
        }
    }

    const issue = getSelectIssue(userData.issueList, ui.selectIssue);

    useEffect(() => {
        setDisplayDeleteMsg(false);
    }, [issue.name]);

    const handleSubmitForm = (issueData) => {
        console.log(issueData)

        issueConnection.putQuery({ body: issueData, urlExtension: '/' + ui.selectProject })
            .then(result => {
                if (result.status === 200)
                    handleLoadIssues();
            });
    }

    return (
        <section>
            <h3>Issue Details</h3>


            {(isEditing)
                ? <IssueDetailsForm
                    setIsEditing={setIsEditing}
                    handleSubmitForm={handleSubmitForm} />
                : <IssueDetailsList
                    issue={issue}
                    issueInterface={props.issueInterface}
                    displayDeleteMsg={displayDeleteMsg}
                    setDisplayDeleteMsg={setDisplayDeleteMsg} />
            }
        </section>
    );
}

export default IssueDetails;