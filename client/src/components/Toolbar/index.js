import React, { useContext } from 'react';

// Components
import IconButton from '../IconButton';
import { LabeledCheckbox } from '../Forms';

// Contexts
import { UiContext, UiDispatcherContext } from '../../pages/Workbench';

const Toolbar = () => {
    const ui = useContext(UiContext);
    const { dispatch, ACTIONS } = useContext(UiDispatcherContext);

    const getProjectName = ({ projectTabs, selectProject }) => {
        for (const tab of projectTabs) {
            if (selectProject === tab._id) {
                return <h1>{tab.projectName}</h1>;
            }
        };

        return <h1>Select A Project</h1>;
    }

    const toggleCreateIssue = () => dispatch({ type: ACTIONS.TOGGLE_CREATE_ISSUE });
    const toggleProjectManager = () => dispatch({ type: ACTIONS.TOGGLE_PROJECT_MANAGER });
    const displayClosedIssues = () => dispatch({ type: ACTIONS.DISPLAY_CLOSED_ISSUES })

    return (
        <section className="tool-bar">

            {getProjectName(ui)}

            <section className="tool-bar-controls">

                {/* Buttons */}

                {(ui.selectProject)
                    ? <LabeledCheckbox
                        name="toggleClosedIssues"
                        onChange={displayClosedIssues}
                        defaultChecked={ui.displayClosedIssue}
                        tooltip={{ text: 'Show closed issues', width: '11rem' }} />
                    : null}

                {(ui.selectProject)
                    ? <IconButton
                        iconName="add"
                        onClick={toggleCreateIssue}
                        alt="create issue button"
                        tooltip={{ text: 'Create new issue', width: '9rem' }}
                        cy="create-issue" />
                    : null}

                <button onClick={toggleProjectManager} data-cy="project-manager">Project Manager</button>

            </section>

        </section >
    )
}

export default Toolbar;