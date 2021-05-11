import React from 'react';

// Components
import DeleteConfirmation from '../DeleteConfirmation';

const IssueDetailsList = (props) => {
    const { handleDeleteIssue } = props.issueInterface;
    const { issue, displayDeleteMsg, setDisplayDeleteMsg } = props;

    const removeDeleteConfirmation = () => setDisplayDeleteMsg(false);

    return (
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
            {(issue.name || issue.name === "")
                ? <div>
                    <button className="link-button" name="editIssue" onClick={() => props.setIsEditing(true)}>
                        Edit Issue
                    </button>

                    <button className="link-button" name="deleteIssue" onClick={() => setDisplayDeleteMsg(true)}>
                        Delete Issue
                    </button>
                </div>
                : null}

            {(displayDeleteMsg)
                ? <DeleteConfirmation type="issue" onConfirm={handleDeleteIssue} onReject={removeDeleteConfirmation} />
                : null}
        </ul>
    );
}

export default IssueDetailsList;