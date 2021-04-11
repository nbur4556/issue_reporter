import React from 'react';

const IssueBar = props => {
    const { issueData, uiDispatcher } = props;
    const { dispatch, ACTIONS } = uiDispatcher;

    const selectIssue = (e) => {
        console.log(e.currentTarget)
        dispatch({ type: ACTIONS.SELECT_ISSUE, payload: { selectIndex: props.index } });
    }

    const formatDueDate = (dueDate) => {
        if (!dueDate) {
            return null;
        }

        const dateArray = dueDate.split('-');
        return `${dateArray[1]}/${dateArray[2].split('T')[0]}/${dateArray[0]}`;
    }

    return (
        <ul
            className={`issue-bar ${props.activeClassName}`}
            onClick={selectIssue}
            data-issueid={issueData._id}
        >
            <li className="name-col">{issueData.name}</li>
            <li className="category-col">{issueData.category}</li>
            <li className="due-date-col">{formatDueDate(issueData.dueDate)}</li>
            {(props.assigned) ? <li>{props.assigned}</li> : null}

            <li><input type="checkbox" /></li>
        </ul>
    );
}

export default IssueBar;