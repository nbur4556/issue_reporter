import React from 'react';

// Components
import ProjectManager from './ProjectManager.js';
import CreateIssue from './CreateIssue.js';
import IssueDetails from './IssueDetails.js';

const WorkbenchDetailSection = ({ ui, ...rest }) => {
    return (
        <section className="detail-section">

            {(ui.displayProjectManager)
                ? <ProjectManager ui={ui} {...rest} />
                : null}

            {(ui.displayCreateIssue)
                ? <CreateIssue ui={ui} {...rest} />
                : null}

            {(typeof ui.selectIssue === 'number')
                ? <IssueDetails ui={ui} {...rest} />
                : null}

        </section>
    )
}

export default WorkbenchDetailSection;