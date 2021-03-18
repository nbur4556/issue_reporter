import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Components
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import ProjectManager from '../../components/ProjectManager';
import IssueBar from '../../components/IssueBar';
import IssueDetails from '../../components/IssueDetails';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const projectConnection = new ApiConnection('/api/project');
const issueConnection = new ApiConnection('/api/issue');

const Workbench = () => {
    const [userData, setUserData] = useState({
        projectList: [],
        issueList: []
    });

    const [userInterface, setUserInterface] = useState({
        selectIssue: null,
        displayProjectManager: false,
        displayClosedIssue: false
    });

    useEffect(() => {
        loadUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadUserData() {
        // Load all user projects
        const [projects, issues] = await Promise.all([
            projectConnection.getQuery(),
            issueConnection.getQuery()
        ]);

        setUserData({ ...userData, projectList: projects.data, issueList: issues.data });
    }

    // Set status of selected issue
    const handleSetIssueStatus = () => {
        const setStatus = (userData.issueList[userInterface.selectIssue].isOpen === true) ? 'false' : 'true';

        // Deselect issue when closed and displaying closed issues is set to false
        if (setStatus === 'false' && userInterface.displayClosedIssue === false) {
            setUserInterface({ ...userInterface, selectIssue: null });
        }

        // Send put request to change issue status, and reload issues
        issueConnection.putQuery({
            urlExtension: `/${userData.issueList[userInterface.selectIssue]._id}`,
            body: { isOpen: setStatus }
        }).then(() => { loadUserData() });
    }

    // Remove Issue from API
    const deleteIssue = e => {
        issueConnection.deleteQuery({ urlExtension: `/${userData.issueList[userInterface.selectIssue]._id}` }).then(() => {
            setUserInterface({ ...userInterface, selectIssue: null });
            loadUserData();
        });
    }

    // USER INTERFACE

    const handleToggleProjectManager = () => {
        (userInterface.displayProjectManager === true)
            ? setUserInterface({ ...userInterface, displayProjectManager: false })
            : setUserInterface({ ...userInterface, displayProjectManager: true, selectIssue: null });
    }

    const handleSelectProject = e => {
        const projectId = e.currentTarget.getAttribute('data-id');
        console.log(projectId);
    }

    const handleSelectIssue = e => {
        const selectIndex = e.currentTarget.getAttribute('data-index');
        (selectIndex === userInterface.selectIssue)
            ? setUserInterface({ ...userInterface, selectIssue: null })
            : setUserInterface({ ...userInterface, selectIssue: selectIndex, displayProjectManager: false });
    }

    const handleDisplayClosedIssue = () => {
        (userInterface.displayClosedIssue === true)
            ? setUserInterface({ ...userInterface, displayClosedIssue: false })
            : setUserInterface({ ...userInterface, displayClosedIssue: true });
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

                    <button onClick={handleToggleProjectManager}>Toggle Project Manager</button>
                </section>

                <TabBar onClick={handleSelectProject}
                    tabData={userData.projectList.map(project => {
                        return { tabId: project._id, tabName: project.projectName }
                    })}
                />

                {/* Issue List Section */}

                <section className="issueListSection">
                    {userData.issueList.map((issue, index) => {
                        return (issue.isOpen === false && userInterface.displayClosedIssue === false)
                            ? null
                            : <IssueBar onClick={handleSelectIssue} key={index} index={index} title={issue.name} />;
                    })}
                </section>

            </section>

            {/* Workbench Details Section */}

            {(userInterface.displayProjectManager === true)
                ? <WorkbenchDetailSection component={ProjectManager} />
                : null}

            {(userInterface.selectIssue !== null)
                ? <WorkbenchDetailSection component={IssueDetails}
                    issue={userData.issueList[userInterface.selectIssue]}
                    toggleStatus={handleSetIssueStatus}
                    deleteIssue={deleteIssue} />
                : null
            }

        </main>
    );
}

export default Workbench;