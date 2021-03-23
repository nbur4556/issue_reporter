import React from 'react';
import { Link } from 'react-router-dom';

const Toolbar = ({ ui }) => {
    return (
        <section>
            <label htmlFor="toggleClosedIssues">
                Show Closed Issues:
                        <input id="toggleClosedIssues" name="toggleClosedIssues" type="checkbox" onChange={ui.handleDisplayClosedIssue} />
            </label>
            <button onClick={ui.handleToggleCreateIssue} data-cy="create-issue">Toggle Create Issue</button>
            <Link to="/create-project">Create Project</Link>

            <button onClick={ui.handleToggleProjectManager} data-cy="project-manager">Toggle Project Manager</button>
        </section>
    )
}

export default Toolbar;