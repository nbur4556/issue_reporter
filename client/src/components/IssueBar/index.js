import React from 'react';

const IssueBar = props => {
    return (
        <div
            className={`issue-bar ${props.activeClassName}`}
            onClick={props.onClick}
            data-index={props.index}>

            <ul>
                <li className="name-col">{props.issueData.name}</li>
                <li className="category-col">{props.issueData.category}</li>
                <li className="due-date-col">{props.issueData.dueDate}</li>
                {(props.assigned) ? <li>{props.assigned}</li> : null}
            </ul>

        </div>
    );
}

export default IssueBar;