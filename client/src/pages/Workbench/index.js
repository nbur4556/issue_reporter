import React, { useState, useEffect } from 'react';
import './style.css';

// Components
import IssueBar from '../../components/IssueBar';
import IssueDetails from '../../components/IssueDetails';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const Workbench = () => {
    const [issueList, setIssueList] = useState([]);
    const [selectIssueId, setSelectIssueId] = useState();

    // Get All Issues from API
    useEffect(() => {
        issueConnection.getQuery().then(result => {
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

                {/* Issue List Section */}

                <section>
                    {issueList.map(issue => {
                        return (
                            <IssueBar onClick={handleSelectIssue} key={issue._id} issueId={issue._id} title={issue.name} />
                        )
                    })}
                </section>

                {/* Original Issue Sample */}
                {/* <IssueBar onClick={handleSelectIssue} issueId="0" title="Issue1" category="test issue" assigned="Nick B." /> */}

            </section>

            {/* Issue Details Section */}
            <IssueDetails
                name="Nick"
                body="Go Nick!"
                category="Person"
                assigned="Rachel"
                dueDate="02/15/2021"
                comments="Congrats Nick!"
                status="Closed"
            />
        </article>
    );
}

export default Workbench;