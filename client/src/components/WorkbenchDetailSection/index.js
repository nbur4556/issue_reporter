import React from 'react';

// Components
import ProjectManager from '../ProjectManager';
import CreateIssue from '../CreateIssue';
import IssueDetails from '../IssueDetails';

const WorkbenchDetailSection = (props) => {
    const { showProjectManager, showCreateIssue, showIssueDetails, ...rest } = props;

    return (
        <section className="detail-section">

            {(showProjectManager)
                ? <ProjectManager {...rest} />
                : null}

            {(showCreateIssue)
                ? <CreateIssue {...rest} />
                : null}

            {(showIssueDetails)
                ? <IssueDetails {...rest} />
                : null}

        </section>
    )
}

export default WorkbenchDetailSection;