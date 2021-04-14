import React, { useState, useEffect, useContext } from 'react';

// Contexts
import { UserDataContext, UiContext } from '../../pages/Workbench';
import DeleteConfirmation from '../DeleteConfirmation';

const IssueDetails = props => {
    const userData = useContext(UserDataContext);
    const ui = useContext(UiContext);
    const { handleDeleteIssue } = props.issueInterface;

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

    const removeDeleteConfirmation = () => setDisplayDeleteMsg(false);

    return (
        <section>
            <h3>Issue Details</h3>
            <ul>
                {/* Display details if details are available */}

                {(issue.name) ? <li className="list-content">
                    {`Name: ${issue.name}`}
                </li> : null}
                {(issue.body) ? <li className="list-content">
                    {`Body: ${issue.body}`}
                </li> : null}
                {(issue.category) ? <li className="list-content">
                    {`Category: ${issue.category}`}
                </li> : null}
                {(issue.assigned) ? <li className="list-content">
                    {`Assigned: ${issue.assigned}`}
                </li> : null}
                {(issue.dueDate) ? <li className="list-content">
                    {`Due Date: ${issue.dueDate}`}
                </li> : null}
                {(issue.comments) ? <li className="list-content">
                    {`Comments: ${issue.comments}`}
                </li> : null}

                {(issue.isOpen === true) ? <li className="list-content">
                    Open
                </li> : null}
                {(issue.isOpen === false) ? <li className="list-content">
                    Closed
                </li> : null}

                {/* Buttons */}

                {(issue.name)
                    ? <button className="link-button" name="deleteIssue" onClick={() => setDisplayDeleteMsg(true)}>
                        Delete Issue
                    </button>
                    : null}

                {(displayDeleteMsg)
                    ? <DeleteConfirmation type="issue" onConfirm={handleDeleteIssue} onReject={removeDeleteConfirmation} />
                    : null}
            </ul>
        </section>
    );
}

export default IssueDetails;