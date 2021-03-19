import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import loadData from './loadData.js';
import { deleteIssue, setIssueStatus } from './IssueInterface.js';
import { editProject, deleteProject } from './ProjectInterface.js';

// Components
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import ProjectManager from '../../components/ProjectManager';
import IssueBar from '../../components/IssueBar';
import IssueDetails from '../../components/IssueDetails';

const Workbench = () => {
    const [userData, setUserData] = useState({
        projectList: [],
        issueList: []
    });

    const [userInterface, setUserInterface] = useState({
        projectTabs: [],
        selectIssue: null,
        displayProjectManager: false,
        displayClosedIssue: false
    });

    useEffect(() => handleLoadData(), []);

    const handleLoadData = () => {
        loadData().then(([projectResponse, issueResponse]) => {
            setUserData({
                projectList: projectResponse.data,
                issueList: issueResponse.data
            });
        });
    }

    const handleEditProject = (e, projectId, projectData) => {
        e.preventDefault();
        editProject({ projectId, projectData }).then(() => handleLoadData());
    }

    const handleDeleteProject = (e) => {
        deleteProject({ projectId: e.currentTarget.parentElement.getAttribute('data-projectid') })
            .then(() => handleLoadData());
    }

    // Set status of selected issue
    const handleSetIssueStatus = () => {
        const setStatus = (userData.issueList[userInterface.selectIssue].isOpen === true) ? 'false' : 'true';

        // Deselect issue when closed and displaying closed issues is set to false
        if (setStatus === 'false' && userInterface.displayClosedIssue === false) {
            setUserInterface({ ...userInterface, selectIssue: null });
        }

        setIssueStatus({ issueId: userData.issueList[userInterface.selectIssue]._id, status: setStatus })
            .then(() => handleLoadData());
    }

    // Remove Issue from API
    const handleDeleteIssue = () => {
        deleteIssue({ issueId: userData.issueList[userInterface.selectIssue]._id }).then(() => {
            setUserInterface({ ...userInterface, selectIssue: null });
            handleLoadData();
        })
    }

    // USER INTERFACE

    const handleToggleProjectManager = () => {
        (userInterface.displayProjectManager === true)
            ? setUserInterface({ ...userInterface, displayProjectManager: false })
            : setUserInterface({ ...userInterface, displayProjectManager: true, selectIssue: null });
    }

    const handleAddProjectTab = e => {
        const projectId = e.currentTarget.parentElement.getAttribute('data-projectid');

        // Check if tab exists
        for (const tab of userInterface.projectTabs) {
            if (tab._id === projectId) return;
        }

        // Find project in project list
        userData.projectList.forEach((project) => {
            if (project._id === projectId)
                setUserInterface({ ...userInterface, projectTabs: [...userInterface.projectTabs, project] });
        });
    }

    const handleRemoveProjectTab = e => {
        const tabIndex = e.currentTarget.parentElement.getAttribute('data-index');
        const splicedProjectTabs = [...userInterface.projectTabs]

        splicedProjectTabs.splice(tabIndex, 1);
        setUserInterface({ ...userInterface, projectTabs: splicedProjectTabs });
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
                    removeTab={handleRemoveProjectTab}
                    tabData={userInterface.projectTabs.map(project => {
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
                ? <WorkbenchDetailSection component={ProjectManager}
                    projects={userData.projectList}
                    addTab={handleAddProjectTab}
                    editProject={handleEditProject}
                    deleteProject={handleDeleteProject}
                />
                : null}

            {(userInterface.selectIssue !== null)
                ? <WorkbenchDetailSection component={IssueDetails}
                    issue={userData.issueList[userInterface.selectIssue]}
                    toggleStatus={handleSetIssueStatus}
                    deleteIssue={handleDeleteIssue} />
                : null
            }

        </main>
    );
}

export default Workbench;