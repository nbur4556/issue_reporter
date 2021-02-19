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
    const [selectedIssueIndex, setSelectedIssueIndex] = useState();

    // Get All Issues from API
    useEffect(() => {
        issueConnection.getQuery().then(result => {
            setIssueList(result.data);
        });
    }, []);

    // Set state of selected issue
    const handleSelectIssue = e => setSelectedIssueIndex(e.currentTarget.getAttribute('data-index'));

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
                    {issueList.map((issue, index) => {
                        return (
                            <IssueBar onClick={handleSelectIssue} key={index} index={index} title={issue.name} />
                        )
                    })}
                </section>

            </section>

            {/* Issue Details Section */}

            <IssueDetails
                name={issueList[selectedIssueIndex]?.name}
                body={issueList[selectedIssueIndex]?.body}
                category={issueList[selectedIssueIndex]?.category}
                assigned={issueList[selectedIssueIndex]?.assigned}
                dueDate={issueList[selectedIssueIndex]?.dueDate}
                comments={issueList[selectedIssueIndex]?.comments}
                status={issueList[selectedIssueIndex]?.status}
            />

        </article>
    );
}

export default Workbench;