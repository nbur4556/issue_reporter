import React from 'react';
import { Link } from 'react-router-dom';

const Toolbar = ({ ui, uiDispatcher }) => {
    const { dispatch, ACTIONS } = uiDispatcher;

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
                <label htmlFor="toggleClosedIssues">
                    Show Closed Issues:
                    <input
                        id="toggleClosedIssues"
                        name="toggleClosedIssues"
                        type="checkbox"
                        onChange={displayClosedIssues}
                    />
                </label>
                <button onClick={toggleCreateIssue} data-cy="create-issue">Toggle Create Issue</button>
                <Link to="/create-project">Create Project</Link>

                <button onClick={toggleProjectManager} data-cy="project-manager">Toggle Project Manager</button>
            </section>
        </section>
    )
}

export default Toolbar;