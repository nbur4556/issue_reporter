import React, { useState, useEffect, useContext } from 'react';

// Components
import IssueDetailsList from '../IssueDetailsList';

// Contexts
import { UserDataContext, UiContext } from '../../pages/Workbench';

const IssueDetails = props => {
    const userData = useContext(UserDataContext);
    const ui = useContext(UiContext);

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

    return (
        <section>
            <h3>Issue Details</h3>
            <IssueDetailsList issue={issue}
                issueInterface={props.issueInterface}
                displayDeleteMsg={displayDeleteMsg}
                setDisplayDeleteMsg={setDisplayDeleteMsg}
            />
        </section>
    );
}

export default IssueDetails;