import React from 'react';

// Components
import IssueBar from '../../components/IssueBar';

const Workbench = () => {
    function handleSelectIssue(e) {
        console.log(e);
    }

    return (
        <article>
            <h1>Workbench Page</h1>

            <IssueBar onClick={handleSelectIssue} title="Issue1" category="test issue" assigned="Nick B." />
            <IssueBar onClick={handleSelectIssue} title="Issue2" category="test issue" />
        </article>
    );
}

export default Workbench;