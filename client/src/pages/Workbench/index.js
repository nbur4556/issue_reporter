import React, { useState } from 'react';

// Components
import IssueBar from '../../components/IssueBar';

const Workbench = () => {
    const [selectIssueId, setSelectIssueId] = useState();

    const handleSelectIssue = issueId => setSelectIssueId(issueId);

    return (
        <article>
            <h1>Workbench Page</h1>

            {/* Issue Details Section */}
            <section>
                {selectIssueId}
            </section>

            {/* Issue List */}
            <IssueBar onClick={handleSelectIssue} issueId="0" title="Issue1" category="test issue" assigned="Nick B." />
            <IssueBar onClick={handleSelectIssue} issueId="1" title="Issue2" category="test issue" />
        </article>
    );
}

export default Workbench;