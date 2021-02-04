import React, { useState } from 'react';
import './style.css';

// Components
import IssueBar from '../../components/IssueBar';

const Workbench = () => {
    const [selectIssueId, setSelectIssueId] = useState();

    const handleSelectIssue = issueId => (selectIssueId === issueId) ? setSelectIssueId(null) : setSelectIssueId(issueId);

    return (
        <article>
            {/* Issue Section */}
            <section>
                {/* Toolbar Section */}
                <section>
                    <input name="sort" type="text" />
                    <input name="filter" type="text" />
                    <button>Creat Issue</button>
                </section>
                <IssueBar onClick={handleSelectIssue} issueId="0" title="Issue1" category="test issue" assigned="Nick B." />
                <IssueBar onClick={handleSelectIssue} issueId="1" title="Issue2" category="test issue" />
            </section>

            {/* Issue Details Section */}
            <aside>
                {selectIssueId}
            </aside>
        </article>
    );
}

export default Workbench;