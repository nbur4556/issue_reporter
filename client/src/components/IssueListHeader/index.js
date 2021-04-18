import React from 'react';

const IssueListHeader = ({ setSortBy }) => {
    return (
        <ul className="issue-bar">
            <li className="name-col" onClick={setSortBy} data-sortby="name"><h4>Name</h4></li>
            <li className="category-col" onClick={setSortBy} data-sortby="category"><h4>Category</h4></li>
            <li className="due-date-col" onClick={setSortBy} data-sortby="dueDate"><h4>Due Date</h4></li>
        </ul>
    );
}

export default IssueListHeader;