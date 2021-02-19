import React from 'react';

import './style.css';

const IssueDetails = props => {
    return (
        <aside>
            <ul>
                <li>{`Name: ${props.name}`}</li>
                <li>{`Body: ${props.body}`}</li>
                <li>{`Category: ${props.category}`}</li>
                <li>{`Assigned: ${props.assigned}`}</li>
                <li>{`Due Date: ${props.dueDate}`}</li>
                <li>{`Comments: ${props.comments}`}</li>
                <li>{`Status: ${props.status}`}</li>
            </ul>
        </aside>
    );
}

export default IssueDetails;