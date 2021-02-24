import React, { useState, useEffect } from 'react';

import './style.css';

const IssueDetails = props => {

    const [displayDeleteMsg, setDisplayDeleteMsg] = useState(false);

    useEffect(() => {
        setDisplayDeleteMsg(false);
    }, [props.name]);

    return (
        <aside>

            <ul>

                {/* Display details if details are available */}

                {(props.name) ? <li>{`Name: ${props.name}`}</li> : null}
                {(props.body) ? <li>{`Body: ${props.body}`}</li> : null}
                {(props.category) ? <li>{`Category: ${props.category}`}</li> : null}
                {(props.assigned) ? <li>{`Assigned: ${props.assigned}`}</li> : null}
                {(props.dueDate) ? <li>{`Due Date: ${props.dueDate}`}</li> : null}
                {(props.comments) ? <li>{`Comments: ${props.comments}`}</li> : null}

                {(props.status === true) ? <li>Open</li> : null}
                {(props.status === false) ? <li>Closed</li> : null}

                {/* Buttons */}

                {(props.status !== undefined) ? <button onClick={props.toggleStatus}>Toggle Status</button> : null}
                {(props.name) ? <button onClick={() => setDisplayDeleteMsg(true)}>Delete Issue</button> : null}

                {/* Delete Confirmation */}

                {(displayDeleteMsg) ? <p>Are you sure you want to delete this issue? This can not be undone.</p> : null}
                {(displayDeleteMsg)
                    ? <div>
                        <a href="#" onClick={props.deleteIssue}>Yes</a>
                        <a href="#" onClick={() => setDisplayDeleteMsg(false)}>No</a>
                    </div>
                    : null}

            </ul>

        </aside>
    );
}

export default IssueDetails;