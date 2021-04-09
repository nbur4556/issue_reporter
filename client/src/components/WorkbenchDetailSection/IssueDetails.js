import React, { useState, useEffect, useContext } from 'react';

// Contexts
import { UserDataContext, UiContext } from '../../pages/Workbench';

const IssueDetails = props => {
    const userData = useContext(UserDataContext);
    const ui = useContext(UiContext);
    const { toggleStatus, handleDeleteIssue } = props.issueInterface;
    const issue = userData.issueList[ui.selectIssue];

    const [displayDeleteMsg, setDisplayDeleteMsg] = useState(false);

    useEffect(() => {
        setDisplayDeleteMsg(false);
    }, [issue.name]);

    return (
        <section>
            <h4>Issue Details</h4>
            <ul>
                {/* Display details if details are available */}

                {(issue.name) ? <li>{`Name: ${issue.name}`}</li> : null}
                {(issue.body) ? <li>{`Body: ${issue.body}`}</li> : null}
                {(issue.category) ? <li>{`Category: ${issue.category}`}</li> : null}
                {(issue.assigned) ? <li>{`Assigned: ${issue.assigned}`}</li> : null}
                {(issue.dueDate) ? <li>{`Due Date: ${issue.dueDate}`}</li> : null}
                {(issue.comments) ? <li>{`Comments: ${issue.comments}`}</li> : null}

                {(issue.isOpen === true) ? <li>Open</li> : null}
                {(issue.isOpen === false) ? <li>Closed</li> : null}

                {/* Buttons */}

                {(issue.isOpen !== undefined)
                    ? <button name="toggleStatus" onClick={toggleStatus}>Toggle Status</button>
                    : null}

                {(issue.name)
                    ? <button name="deleteIssue" onClick={() => setDisplayDeleteMsg(true)}>Delete Issue</button>
                    : null}

                {/* Delete Confirmation */}

                {(displayDeleteMsg) ? <p>Are you sure you want to delete this issue? This can not be undone.</p> : null}
                {(displayDeleteMsg)
                    ? <div>
                        <button name="confirmDelete" onClick={handleDeleteIssue}>Yes</button>
                        <button name="cancelDelete" onClick={() => setDisplayDeleteMsg(false)}>No</button>
                    </div>
                    : null}
            </ul>
        </section>
    );
}

export default IssueDetails;