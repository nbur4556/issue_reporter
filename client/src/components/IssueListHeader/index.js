import React from 'react';

const IssueListHeader = () => {
    return (
        <ul className="issue-bar">
            <li className="name-col">Name</li>
            <li className="category-col">Category</li>
            <li className="due-date-col">Due Date</li>
        </ul>
    );
}

export default IssueListHeader;