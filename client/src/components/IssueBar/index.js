import React from 'react';
import './style.css';

const IssueBar = props => {
    return (
        <div className="issue-bar" onClick={() => props.onClick(props.issueId)}>
            <ul>
                <li>{props.title}</li>
                <li>{props.category}</li>
                {(props.assigned) ? <li>{props.assigned}</li> : null}
            </ul>
        </div>
    );
}

export default IssueBar;