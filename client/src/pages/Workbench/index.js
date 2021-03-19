import React, { useState, useEffect } from 'react';
import './style.css';

import Render from './Render';
import UI from './UI';
import loadData from './loadData';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

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

    const { handleDeleteIssue, handleSetIssueStatus } = IssueInterface();
    const { handleEditProject, handleDeleteProject } = ProjectInterface();
    const {
        handleToggleProjectManager, handleAddProjectTab,
        handleRemoveProjectTab, handleSelectProject,
        handleSelectIssue, handleDisplayClosedIssue
    } = UI({ userInterface, setUserInterface, userData });

    useEffect(() => handleLoadData(), []);

    const handleLoadData = () => {
        loadData().then(([projectResponse, issueResponse]) => {
            setUserData({
                projectList: projectResponse.data,
                issueList: issueResponse.data
            });
        });
    }

    return (
        <Render
            ui={userInterface}
            userData={userData}
            displayClosedIssue={handleDisplayClosedIssue}
            toggleProjectManager={handleToggleProjectManager}
            selectProject={handleSelectProject}
            removeProjectTab={handleRemoveProjectTab}
            selectIssue={handleSelectIssue}
            addProjectTab={handleAddProjectTab}

            editProject={
                (e, projectId, projectData) => handleEditProject(e, projectId, projectData, handleLoadData)
            }
            deleteProject={
                (e) => handleDeleteProject(e, handleLoadData)
            }
            setIssueStatus={
                () => handleSetIssueStatus(userData, userInterface, setUserInterface, handleLoadData)
            }
            deleteIssue={
                () => handleDeleteIssue(userData, userInterface, setUserInterface, handleLoadData)
            }
        />
    );
}

export default Workbench;