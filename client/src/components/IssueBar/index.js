import React, { useState, useContext } from 'react';

// Components
import { LabeledCheckbox } from '../Forms';

// Contexts
import { UiDispatcherContext } from '../../pages/Workbench';

const IssueBar = props => {
    const { issueData } = props;
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);
    const checkboxColor = (props.activeClassName === 'active-issue') ? 'checkbox-light-color' : 'checkbox-main-color';

    // State
    const [isChecked, setIsChecked] = useState(!issueData.isOpen);

    const selectIssue = (e) => dispatch({
        type: ACTIONS.SELECT_ISSUE,
        payload: { issueId: e.currentTarget.getAttribute('data-issueid') }
    });

    const formatDueDate = (dueDate) => {
        if (!dueDate) {
            return null;
        }

        const dateArray = dueDate.split('-');
        return `${dateArray[1]}/${dateArray[2].split('T')[0]}/${dateArray[0]}`;
    }

    const toggleIsClosed = e => {
        e.stopPropagation();
        setIsChecked(!isChecked);
        props.handleSetIssueStatus(issueData);
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

            <li className="status-col">
                <LabeledCheckbox defaultChecked={isChecked} onClick={toggleIsClosed} colorClass={checkboxColor} />
            </li>
        </ul>
    );
}

export default IssueBar;