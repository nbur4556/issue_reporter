import React, { useContext } from 'react';
import './style.css';

// Components
import ProjectManager from './ProjectManager.js';
import CreateProject from './CreateProject.js';
import CreateIssue from './CreateIssue.js';
import IssueDetails from './IssueDetails.js';

// Contexts
import { UiContext } from '../../pages/Workbench';

const WorkbenchDetailSection = (props) => {
    const ui = useContext(UiContext);

    return (
        <section className="detail-section">
            {(ui.displayProjectManager) ? <ProjectManager {...props} /> : null}
            {(ui.displayCreateProject) ? <CreateProject {...props} /> : null}
            {(ui.displayCreateIssue) ? <CreateIssue {...props} /> : null}
            {(ui.selectIssue) ? <IssueDetails {...props} /> : null}
        </section>
    )
}

export default WorkbenchDetailSection;