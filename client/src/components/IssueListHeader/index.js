import React from 'react';

const IssueListHeader = () => {
    return (
        <div className="issue-bar">
            <ul>
                <li className="name-col">Name</li>
                <li className="category-col">Category</li>
                <li className="due-date-col">Due Date</li>
            </ul>
        </div>
    );
}

export default IssueListHeader;