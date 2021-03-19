import React, { useState, useEffect } from 'react';
import './style.css';

import Render from './Render';
import UI from './UI';
import loadData from './loadData';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

const Workbench = () => {
    const { handleDeleteIssue, handleSetIssueStatus } = IssueInterface();
    const { handleEditProject, handleDeleteProject } = ProjectInterface();

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

    const { handleToggleProjectManager } = UI({ userInterface, setUserInterface });

    useEffect(() => handleLoadData(), []);

    const handleLoadData = () => {
        loadData().then(([projectResponse, issueResponse]) => {
            setUserData({
                projectList: projectResponse.data,
                issueList: issueResponse.data
            });
        });
    }

    // USER INTERFACE

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