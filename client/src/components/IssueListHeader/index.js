import React from 'react';

// Components
import IconButton from '../IconButton';

const IssueListHeader = ({ sortBy, setSortBy, isDescending }) => {
    console.log(sortBy);
    console.log(isDescending);

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
                <h4>Name</h4>
                <IconButton iconName={selectIconButton('name')} />
            </li>
            <li className="category-col" onClick={setSortBy} data-sortby="category">
                <h4>Category</h4>
                <IconButton iconName={selectIconButton('category')} />
            </li>
            <li className="due-date-col" onClick={setSortBy} data-sortby="dueDate">
                <h4>Due Date</h4>
                <IconButton iconName={selectIconButton('dueDate')} />
            </li>
        </ul>
    );
}

export default IssueListHeader;