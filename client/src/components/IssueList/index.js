import React, { useContext } from 'react';
import './style.css';

// Components
import IssueListHeader from '../IssueListHeader';
import IssueBar from '../IssueBar';

// Contexts
import { UserDataContext, UiContext } from '../../pages/Workbench';

const IssueList = ({ uiDispatcher, issueInterface }) => {
    const userData = useContext(UserDataContext);
    const ui = useContext(UiContext);

    return (
        <section className="issueListSection">
            <IssueListHeader />

            {userData.issueList.map((issue, index) => {
                const activeClassName = (issue._id === ui.selectIssue)
                    ? "active-issue"
                    : "inactive-issue";

                return (issue.isOpen === false && ui.displayClosedIssue === false)
                    ? null
                    : <IssueBar
                        uiDispatcher={uiDispatcher}
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