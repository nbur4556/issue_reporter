import React from 'react';
import './style.css';

// Components
import IssueListHeader from '../IssueListHeader';
import IssueBar from '../IssueBar';

const IssueList = ({ userData, ui, uiDispatcher }) => {
    return (
        <section className="issueListSection">
            <IssueListHeader />

            {userData.issueList.map((issue, index) => {
                const activeClassName = (index === Number(ui.selectIssue))
                    ? "active-issue"
                    : "inactive-issue";

                return (issue.isOpen === false && ui.displayClosedIssue === false)
                    ? null
                    : <IssueBar
                        uiDispatcher={uiDispatcher}
                        key={index}
                        index={index}
                        issueData={issue}
                        activeClassName={activeClassName}
                    />;
            })}
        </section>
    );
}

export default IssueList;