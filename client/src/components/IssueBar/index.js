import React from 'react';

const IssueBar = props => {
    return (
        <div
            className={`issue-bar ${props.activeClassName}`}
            onClick={props.onClick}
            data-index={props.index}>

            <ul>
                <li>{props.issueData.name}</li>
                <li>{props.issueData.category}</li>
                <li>{props.issueData.dueDate}</li>
                {(props.assigned) ? <li>{props.assigned}</li> : null}
            </ul>

        </div>
    );
}

export default IssueBar;