import React, { useState, useEffect, useContext } from 'react';

// Components
import IssueDetailsList from '../IssueDetailsList';
import IssueDetailsForm from '../IssueDetailsForm';
import ResultMessage from '../ResultMessage';

// Contexts
import { UserDataContext, UiContext } from '../../pages/Workbench';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const IssueDetails = props => {
    const userData = useContext(UserDataContext);
    const ui = useContext(UiContext);

    const { handleLoadIssues } = props.issueInterface;

    const [editSuccess, setEditSuccess] = useState();
    const [isEditing, setIsEditing] = useState(false);
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
        issueConnection.putQuery({ body: issueData, urlExtension: '/' + ui.selectIssue })
            .then(result => {
                if (result.status === 200) {
                    handleLoadIssues();
                    setIsEditing(false);
                }
            })
            .catch(err => {
                setEditSuccess(false);
            });
    }

    return (
        <section>
            <h3>Issue Details</h3>

            {(isEditing)
                ? <IssueDetailsForm
                    setIsEditing={setIsEditing}
                    setEditSuccess={setEditSuccess}
                    handleSubmitForm={handleSubmitForm} />
                : <IssueDetailsList
                    issue={issue}
                    issueInterface={props.issueInterface}
                    setIsEditing={setIsEditing}
                    displayDeleteMsg={displayDeleteMsg}
                    setDisplayDeleteMsg={setDisplayDeleteMsg} />
            }

            {(isEditing) ? <ResultMessage result={editSuccess} errorMsg="Error: Can not edit issue." /> : null}
        </section>
    );
}

export default IssueDetails;