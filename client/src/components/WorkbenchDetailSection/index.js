import React from 'react';

// Components
import ProjectManager from '../ProjectManager';
import IssueDetails from '../IssueDetails';

const WorkbenchDetailSection = (props) => {
    const { showProjectManager, showIssueDetails, ...rest } = props;

    return (
        <section className="detail-section">

            {(showProjectManager)
                ? <ProjectManager {...rest} />
                : null}

            {(showIssueDetails)
                ? <IssueDetails {...rest} />
                : null}

        </section>
    )
}

export default WorkbenchDetailSection;