import React from 'react';

// Components
import IssueBar from '../../components/IssueBar';

const Workbench = () => {
    return (
        <article>
            <h1>Workbench Page</h1>

            <IssueBar title="Issue1" category="test issue" assigned="Nick B." />
            <IssueBar title="Issue2" category="test issue" />
        </article>
    );
}

export default Workbench;