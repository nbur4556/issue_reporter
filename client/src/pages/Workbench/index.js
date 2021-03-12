import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Components
import IssueBar from '../../components/IssueBar';
import IssueDetails from '../../components/IssueDetails';
import TabBar from '../../components/TabBar';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');
const issueConnection = new ApiConnection('/api/issue');

const Workbench = () => {
    const [userData, setUserData] = useState({
        projectList: [],
        issueList: []
    });

    const [selectIssue, setSelectIssue] = useState();
    const [displayClosedIssue, setDisplayClosedIssue] = useState(false);

    useEffect(() => {
        loadUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadUserData() {
        // Load all user projects
        const [projects, issues] = await Promise.all([
            projectConnection.getQuery({ authorization: localStorage.getItem('authToken') }),
            issueConnection.getQuery()
        ]);

        setUserData({ ...userData, projectList: projects.data, issueList: issues.data });
    }

    // Toggle if closed issues are displayed
    const handleDisplayClosedIssue = () => {
        (displayClosedIssue === true) ? setDisplayClosedIssue(false) : setDisplayClosedIssue(true);
    }

    const handleSelectProject = e => {
        const projectId = e.currentTarget.getAttribute('data-id');
        console.log(projectId);
    }

    // Set state of selected issue
    const handleSelectIssue = e => {
        const selectIndex = e.currentTarget.getAttribute('data-index');
        (selectIndex === selectIssue) ? setSelectIssue(null) : setSelectIssue(selectIndex);
    }

    // Set status of selected issue
    const handleSetIssueStatus = () => {
        const setStatus = (userData.issueList[selectIssue].isOpen === true) ? 'false' : 'true';

        // Send put request to change issue status, and reload issues
        issueConnection.putQuery({
            urlExtension: `/${userData.issueList[selectIssue]._id}`,
            body: { isOpen: setStatus }
        }).then(() => { loadUserData() });
    }

    // Remove Issue from API
    const deleteIssue = e => {
        issueConnection.deleteQuery({ urlExtension: `/${userData.issueList[selectIssue]._id}` }).then(() => {
            setSelectIssue(null);
            loadUserData();
        });
    }

    return (
        <main>

            {/* Issue Section */}

            <section>

                {/* Toolbar Section */}

                <section>
                    <label htmlFor="toggleClosedIssues">
                        Show Closed Issues:
                        <input id="toggleClosedIssues" name="toggleClosedIssues" type="checkbox" onChange={handleDisplayClosedIssue} />
                    </label>
                    <Link to="/create-issue">Create Issue</Link>
                    <Link to="/create-project">Create Project</Link>
                </section>

                <TabBar onClick={handleSelectProject}
                    tabData={userData.projectList.map(project => {
                        return { tabId: project._id, tabName: project.projectName }
                    })}
                />

                {/* Issue List Section */}

                <section className="issueListSection">
                    {userData.issueList.map((issue, index) => {
                        return (issue.isOpen === false && displayClosedIssue === false)
                            ? null
                            : <IssueBar onClick={handleSelectIssue} key={index} index={index} title={issue.name} />;
                    })}
                </section>

            </section>

            {/* Issue Details Section */}

            <IssueDetails
                name={userData.issueList[selectIssue]?.name}
                body={userData.issueList[selectIssue]?.body}
                category={userData.issueList[selectIssue]?.category}
                assigned={userData.issueList[selectIssue]?.assigned}
                dueDate={userData.issueList[selectIssue]?.dueDate}
                comments={userData.issueList[selectIssue]?.comments}
                status={userData.issueList[selectIssue]?.isOpen}

                toggleStatus={handleSetIssueStatus}
                deleteIssue={deleteIssue}
            />

        </main>
    );
}

export default Workbench;