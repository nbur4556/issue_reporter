import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Components
import IssueBar from '../../components/IssueBar';
import IssueDetails from '../../components/IssueDetails';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const issueConnection = new ApiConnection('/api/issue');

const Workbench = () => {
    const [displayClosedIssue, setDisplayClosedIssue] = useState(false);

    const [issueList, setIssueList] = useState([]);
    const [selectIssue, setSelectIssue] = useState();

    useEffect(() => {
        loadIssues();
    }, []);

    // Toggle if closed issues are displayed
    const handleDisplayClosedIssue = () => { (displayClosedIssue === true) ? setDisplayClosedIssue(false) : setDisplayClosedIssue(true); }

    // Set state of selected issue
    const handleSelectIssue = e => {
        const selectIndex = e.currentTarget.getAttribute('data-index');
        (selectIndex === selectIssue) ? setSelectIssue(null) : setSelectIssue(selectIndex);
    }

    // Set status of selected issue
    const handleSetIssueStatus = () => {
        const setStatus = (issueList[selectIssue].isOpen === true) ? 'false' : 'true';

        // Send put request to change issue status, and reload issues
        issueConnection.putQuery({
            urlExtension: `/${issueList[selectIssue]._id}`,
            body: { isOpen: setStatus }
        }).then(() => { loadIssues() });
    }

    // Get All Issues from API
    const loadIssues = () => {
        issueConnection.getQuery().then(result => {
            setIssueList(result.data);
        });
    }

    // Remove Issue from API
    const deleteIssue = e => {
        issueConnection.deleteQuery({ urlExtension: `/${issueList[selectIssue]._id}` }).then(() => {
            setSelectIssue(null);
            loadIssues();
        });
    }

    return (
        <article>

            {/* Issue Section */}

            <section>

                {/* Toolbar Section */}

                <section>
                    <label htmlFor="toggleClosedIssues">
                        Show Closed Issues:
                        <input id="toggleClosedIssues" name="toggleClosedIssues" type="checkbox" onChange={handleDisplayClosedIssue} />
                    </label>
                    <Link to="/create-issue">Create Issue</Link>
                </section>

                {/* Issue List Section */}

                <section className="issueListSection">
                    {issueList.map((issue, index) => {
                        return (issue.isOpen === false && displayClosedIssue === false)
                            ? null
                            : <IssueBar onClick={handleSelectIssue} key={index} index={index} title={issue.name} />;
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

                toggleStatus={handleSetIssueStatus}
                deleteIssue={deleteIssue}
            />

        </article>
    );
}

export default Workbench;