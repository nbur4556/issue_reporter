import React from 'react';

// Components
import IssueBar from '../IssueBar';

const IssueList = (props) => {
    return (
        <section className="issueListSection">
            {props.userData.issueList.map((issue, index) => {
                return (issue.isOpen === false && props.ui.displayClosedIssue === false)
                    ? null
                    : <IssueBar onClick={props.selectIssue} key={index} index={index} title={issue.name} />;
            })}
        </section>
    );
}

export default IssueList;