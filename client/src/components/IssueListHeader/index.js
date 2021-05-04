import React from 'react';

// Components
import IconButton from '../IconButton';

const IssueListHeader = ({ sortBy, setSortBy, isDescending }) => {
    const selectIconButton = (typeName) => {
        if (sortBy === typeName && isDescending === false) {
            return 'sortUp';
        }
        else if (sortBy === typeName && isDescending === true) {
            return 'sortDown';
        }
        else {
            return 'sort';
        }
    }

    return (
        <ul className="issue-bar">
            <li className="name-col" onClick={setSortBy} data-sortby="name">
                <IconButton label="Name" iconName={selectIconButton('name')} />
            </li>
            <li className="category-col" onClick={setSortBy} data-sortby="category">
                <IconButton label="Category" iconName={selectIconButton('category')} />
            </li>
            <li className="due-date-col" onClick={setSortBy} data-sortby="dueDate">
                <IconButton label="Due" iconName={selectIconButton('dueDate')} />
            </li>
        </ul>
    );
}

export default IssueListHeader;