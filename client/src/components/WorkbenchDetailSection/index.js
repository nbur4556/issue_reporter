import React from 'react';

// Components
import ProjectManager from '../ProjectManager';
import CreateIssue from '../CreateIssue';
import IssueDetails from '../IssueDetails';

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