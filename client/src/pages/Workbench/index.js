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
    const [selectIssue, setSelectIssue] = useState();

    // Get All Issues from API
    useEffect(() => {
        issueConnection.getQuery().then(result => {
            setIssueList(result.data);
        });
    }, []);

    // Set state of selected issue
    const handleSelectIssue = e => {
        const selectIndex = e.currentTarget.getAttribute('data-index');
        (selectIndex === selectIssue) ? setSelectIssue(null) : setSelectIssue(selectIndex);
    }

    // Set status of selected issue
    const handleSetIssueStatus = () => {
        if (issueList[selectIssue].isOpen === true) {
            issueConnection.putQuery({
                urlExtension: `/${issueList[selectIssue]._id}`,
                body: { isOpen: 'false' }
            });
        }
        else {
            issueConnection.putQuery({
                urlExtension: `/${issueList[selectIssue]._id}`,
                body: { isOpen: 'true' }
            });
        }
    }

    return (
        <article>

            {/* Issue Section */}

            <section>

                {/* Toolbar Section */}

                <section>
                    <input name="sort" type="text" />
                    <input name="filter" type="text" />
                    <button onClick={handleSetIssueStatus}>Creat Issue</button>
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
                name={issueList[selectIssue]?.name}
                body={issueList[selectIssue]?.body}
                category={issueList[selectIssue]?.category}
                assigned={issueList[selectIssue]?.assigned}
                dueDate={issueList[selectIssue]?.dueDate}
                comments={issueList[selectIssue]?.comments}
                status={issueList[selectIssue]?.isOpen}
            />

        </article>
    );
}

export default Workbench;