import React, { useContext } from 'react';
import './style.css';

// Components
import IconButton from '../IconButton';
import ProjectManager from './ProjectManager.js';
import CreateProject from './CreateProject.js';
import CreateIssue from './CreateIssue.js';
import IssueDetails from './IssueDetails.js';

// Contexts
import { UiContext } from '../../pages/Workbench';

const WorkbenchDetailSection = (props) => {
    const ui = useContext(UiContext);

    const setMobileVisibility = () => {
        return (ui.displayProjectManager || ui.displayCreateProject || ui.displayCreateIssue || ui.selectIssue)
            ? 'show-on-mobile' : 'hide-on-mobile';
    }

    return (
        <section className={`detail-section ${setMobileVisibility()}`}>
            <IconButton iconName="exit" className="close-detail" />

            {(ui.displayProjectManager) ? <ProjectManager {...props} /> : null}
            {(ui.displayCreateProject) ? <CreateProject {...props} /> : null}
            {(ui.displayCreateIssue) ? <CreateIssue {...props} /> : null}
            {(ui.selectIssue) ? <IssueDetails {...props} /> : null}
        </section>
    )
}

export default WorkbenchDetailSection;