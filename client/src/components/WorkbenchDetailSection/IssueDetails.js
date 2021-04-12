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

    return (
        <section>
            <h3>Issue Details</h3>
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

                {(issue.name)
                    ? <button className="link-button" name="deleteIssue" onClick={() => setDisplayDeleteMsg(true)}>Delete Issue</button>
                    : null}

                {/* Delete Confirmation */}

                {(displayDeleteMsg) ? <p>Are you sure you want to delete this issue? This can not be undone.</p> : null}
                {(displayDeleteMsg)
                    ? <div>
                        <button className="link-button" name="confirmDelete" onClick={handleDeleteIssue}>Yes</button>
                        <button className="link-button" name="cancelDelete" onClick={() => setDisplayDeleteMsg(false)}>No</button>
                    </div>
                    : null}

                {(displayDeleteMsg) ? <DeleteConfirmation /> : null}
            </ul>
        </section>
    );
}

export default IssueDetails;