import React, { useState, useEffect } from 'react';

const IssueDetails = props => {
    const { toggleStatus, deleteIssue } = props.issueInterface;
    const [displayDeleteMsg, setDisplayDeleteMsg] = useState(false);

    useEffect(() => {
        setDisplayDeleteMsg(false);
    }, [props.issue.name]);

    return (
        <ul>

            {/* Display details if details are available */}

            {(props.issue.name) ? <li>{`Name: ${props.issue.name}`}</li> : null}
            {(props.issue.body) ? <li>{`Body: ${props.issue.body}`}</li> : null}
            {(props.issue.category) ? <li>{`Category: ${props.issue.category}`}</li> : null}
            {(props.issue.assigned) ? <li>{`Assigned: ${props.issue.assigned}`}</li> : null}
            {(props.issue.dueDate) ? <li>{`Due Date: ${props.issue.dueDate}`}</li> : null}
            {(props.issue.comments) ? <li>{`Comments: ${props.issue.comments}`}</li> : null}

            {(props.issue.isOpen === true) ? <li>Open</li> : null}
            {(props.issue.isOpen === false) ? <li>Closed</li> : null}

            {/* Buttons */}

            {(props.issue.isOpen !== undefined)
                ? <button name="toggleStatus" onClick={toggleStatus}>Toggle Status</button>
                : null}

            {(props.issue.name)
                ? <button name="deleteIssue" onClick={() => setDisplayDeleteMsg(true)}>Delete Issue</button>
                : null}

            {/* Delete Confirmation */}

            {(displayDeleteMsg) ? <p>Are you sure you want to delete this issue? This can not be undone.</p> : null}
            {(displayDeleteMsg)
                ? <div>
                    <button name="confirmDelete" onClick={deleteIssue}>Yes</button>
                    <button name="cancelDelete" onClick={() => setDisplayDeleteMsg(false)}>No</button>
                </div>
                : null}

        </ul>
    );
}

export default IssueDetails;