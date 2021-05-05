import React, { useContext } from 'react';
import './style.css';

// Components
import IconButton from '../IconButton';
import ProjectManager from './ProjectManager.js';
import CreateProject from './CreateProject.js';
import CreateIssue from './CreateIssue.js';
import IssueDetails from './IssueDetails.js';

// Contexts
import { UiContext, UiDispatcherContext } from '../../pages/Workbench';

const WorkbenchDetailSection = (props) => {
    const ui = useContext(UiContext);
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    const setMobileVisibility = () => {
        return (ui.displayProjectManager || ui.displayCreateProject || ui.displayCreateIssue || ui.selectIssue)
            ? 'show-on-mobile' : 'hide-on-mobile';
    }

    const closeDetailSection = () => {
        console.log(props);
        if (ui.displayProjectManager) { dispatch({ type: ACTIONS.TOGGLE_PROJECT_MANAGER }) }
        if (ui.displayCreateProject) { dispatch({ type: ACTIONS.TOGGLE_CREATE_PROJECT }) }
        if (ui.displayCreateIssue) { dispatch({ type: ACTIONS.TOGGLE_CREATE_ISSUE }) }
        if (ui.selectIssue) { dispatch({ type: ACTIONS.SELECT_ISSUE, payload: { issueId: ui.selectIssue } }) }
    }

    return (
        <section className={`detail-section ${setMobileVisibility()}`}>
            <IconButton iconName="exit" className="close-detail" onClick={closeDetailSection} />

            {(ui.displayProjectManager) ? <ProjectManager {...props} /> : null}
            {(ui.displayCreateProject) ? <CreateProject {...props} /> : null}
            {(ui.displayCreateIssue) ? <CreateIssue {...props} /> : null}
            {(ui.selectIssue) ? <IssueDetails {...props} /> : null}
        </section>
    )
}

export default WorkbenchDetailSection;