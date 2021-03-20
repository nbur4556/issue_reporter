import React from 'react';

// Components
import ProjectManager from '../ProjectManager';
import CreateIssue from '../CreateIssue';
import IssueDetails from '../IssueDetails';

const WorkbenchDetailSection = ({ ui, ...rest }) => {
    return (
        <section className="detail-section">

            {(ui.displayProjectManager)
                ? <ProjectManager {...rest} />
                : null}

            {(ui.displayCreateIssue)
                ? <CreateIssue {...rest} />
                : null}

            {(ui.selectIssue)
                ? <IssueDetails {...rest} />
                : null}

        </section>
    )
}

export default WorkbenchDetailSection;