import React from 'react';

const IssueListHeader = () => {
    return (
        <ul className="issue-bar">
            <li className="name-col"><h4>Name</h4></li>
            <li className="category-col"><h4>Category</h4></li>
            <li className="due-date-col"><h4>Due Date</h4></li>
        </ul>
    );
}

export default IssueListHeader;