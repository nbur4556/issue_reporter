import React, { useState, useEffect } from 'react';
import './style.css';

import Render from './Render';
import UI from './UI';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

import loadData from './loadData';

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

    // Get projects and issues for authorized users
    const handleLoadData = () => {
        loadData().then(([projectResponse, issueResponse]) => {
            setUserData({
                projectList: projectResponse.data,
                issueList: issueResponse.data
            });
        });
    }

    // Logical Component Destructuring
    const { handleDeleteIssue, handleSetIssueStatus } = IssueInterface({ userData, userInterface, setUserInterface, handleLoadData });
    const { handleEditProject, handleDeleteProject } = ProjectInterface({ handleLoadData });
    const {
        handleToggleProjectManager, handleAddProjectTab,
        handleRemoveProjectTab, handleSelectProject,
        handleSelectIssue, handleDisplayClosedIssue
    } = UI({ userInterface, setUserInterface, userData });

    return (
        <Render
            ui={userInterface}
            toggleProjectManager={handleToggleProjectManager}
            addProjectTab={handleAddProjectTab}
            removeProjectTab={handleRemoveProjectTab}
            selectProject={handleSelectProject}
            selectIssue={handleSelectIssue}
            displayClosedIssue={handleDisplayClosedIssue}

            userData={userData}
            editProject={handleEditProject}
            deleteProject={handleDeleteProject}
            setIssueStatus={handleSetIssueStatus}
            deleteIssue={handleDeleteIssue}
        />
    );
}

export default Workbench;