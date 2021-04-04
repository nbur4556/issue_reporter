import React from 'react';
import { format } from 'date-fns';

const IssueBar = props => {
    const { issueData } = props;

    const formatDueDate = (dueDate) => {
        if (!dueDate) {
            return null;
        }

        const dateArray = dueDate.split('-');
        return `${dateArray[1]}/${dateArray[2].split('T')[0]}/${dateArray[0]}`;
    }

    return (
        <div
            className={`issue-bar ${props.activeClassName}`}
            onClick={props.onClick}
            data-index={props.index}>

            <ul>
                <li className="name-col">{issueData.name}</li>
                <li className="category-col">{issueData.category}</li>
                <li className="due-date-col">{formatDueDate(issueData.dueDate)}</li>
                {(props.assigned) ? <li>{props.assigned}</li> : null}
            </ul>

        </div>
    );
}

export default IssueBar;