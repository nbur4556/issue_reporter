import React from 'react';

// Components
import IconButton from '../IconButton';

const IssueListHeader = ({ setSortBy }) => {
    return (
        <ul className="issue-bar">
            <li className="name-col" onClick={setSortBy} data-sortby="name">
                <h4>Name</h4>
                <IconButton iconName="sort" />
            </li>
            <li className="category-col" onClick={setSortBy} data-sortby="category">
                <h4>Category</h4>
                <IconButton iconName="sort" />
            </li>
            <li className="due-date-col" onClick={setSortBy} data-sortby="dueDate">
                <h4>Due Date</h4>
                <IconButton iconName="sort" />
            </li>
        </ul>
    );
}

export default IssueListHeader;