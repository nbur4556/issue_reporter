import React, { useState, useEffect } from 'react';
import './style.css';

// Components
import IssueBar from '../../components/IssueBar';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const Workbench = () => {
    const [issueList, setIssueList] = useState([]);
    const [selectIssueId, setSelectIssueId] = useState();

    // Get Issues from API
    useEffect(() => {
        issueConnection.getQuery({ urlExtension: "" }).then(result => {
            setIssueList(result.data);
        });
    }, []);

    // Set state of selected issue
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
                {
                    issueList.map(issue => {
                        return (
                            <IssueBar onClick={handleSelectIssue} key={issue._id} issueId={issue._id} title={issue.name} />
                        )
                    })
                }

                {/* Sample Original Issue */}
                {/* <IssueBar onClick={handleSelectIssue} issueId="0" title="Issue1" category="test issue" assigned="Nick B." /> */}
            </section>

            {/* Issue Details Section */}
            <aside>
                {selectIssueId}
            </aside>
        </article>
    );
}

export default Workbench;