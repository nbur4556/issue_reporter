import React from 'react';
import { Link } from 'react-router-dom';

const Toolbar = ({ ui }) => {
    return (
        <section>
            <label htmlFor="toggleClosedIssues">
                Show Closed Issues:
                        <input id="toggleClosedIssues" name="toggleClosedIssues" type="checkbox" onChange={ui.handleDisplayClosedIssue} />
            </label>
            <Link to="/create-issue">Create Issue</Link>
            <button onClick={ui.handleToggleCreateIssue}>Toggle Create Issue</button>
            <Link to="/create-project">Create Project</Link>

            <button onClick={ui.handleToggleProjectManager}>Toggle Project Manager</button>
        </section>
    )
}

export default Toolbar;