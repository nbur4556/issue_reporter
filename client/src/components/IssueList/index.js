/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import './style.css';

// Components
import IssueListHeader from '../IssueListHeader';
import IssueBar from '../IssueBar';

// Contexts
import { UserDataContext, UiContext, UiDispatcherContext } from '../../pages/Workbench';

const IssueList = ({ issueInterface }) => {
    const userData = useContext(UserDataContext);
    const ui = useContext(UiContext);
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    useEffect(() => issueInterface.handleLoadIssues(), [ui.sortBy]);

    const setSortBy = (e) => {
        const sortBy = e.currentTarget.getAttribute('data-sortby');
        dispatch({ type: ACTIONS.SORT_ISSUES, payload: { sortBy: sortBy } });
    }

    return (
        <section className="issueListSection">
            <IssueListHeader setSortBy={setSortBy} />

            {userData.issueList.map((issue, index) => {
                const activeClassName = (issue._id === ui.selectIssue)
                    ? "active-issue"
                    : "inactive-issue";

                return (issue.isOpen === false && ui.displayClosedIssue === false)
                    ? null
                    : <IssueBar
                        handleSetIssueStatus={issueInterface.handleSetIssueStatus}
                        key={index}
                        issueData={issue}
                        activeClassName={activeClassName}
                    />;
            })}
        </section>
    );
}

export default IssueList;