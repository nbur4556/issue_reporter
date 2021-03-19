import React from 'react';
import { Link } from 'react-router-dom';

const Toolbar = (props) => {
    return (
        <section>
            <label htmlFor="toggleClosedIssues">
                Show Closed Issues:
                        <input id="toggleClosedIssues" name="toggleClosedIssues" type="checkbox" onChange={props.displayClosedIssue} />
            </label>
            <Link to="/create-issue">Create Issue</Link>
            <Link to="/create-project">Create Project</Link>

            <button onClick={props.toggleProjectManager}>Toggle Project Manager</button>
        </section>
    )
}

export default Toolbar;