import React from 'react';
import { Link } from 'react-router-dom';

const Toolbar = ({ ui, handleUi }) => {
    const getProjectName = ({ projectTabs, selectProject }) => {
        for (const tab of projectTabs) {
            if (selectProject === tab._id) {
                return <h1>{tab.projectName}</h1>;
            }
        };

        return <h1>Select A Project</h1>;
    }

    return (
        <section className="tool-bar">

            {getProjectName(ui)}

            <label htmlFor="toggleClosedIssues">
                Show Closed Issues:
                        <input id="toggleClosedIssues" name="toggleClosedIssues" type="checkbox" onChange={handleUi.handleDisplayClosedIssue} />
            </label>
            <button onClick={handleUi.handleToggleCreateIssue} data-cy="create-issue">Toggle Create Issue</button>
            <Link to="/create-project">Create Project</Link>

            <button onClick={handleUi.handleToggleProjectManager} data-cy="project-manager">Toggle Project Manager</button>
        </section>
    )
}

export default Toolbar;