import React, { useState, useEffect } from 'react';
import './style.css';

import Render from './Render';
import HandleUi from './HandleUi';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

import loadData from './loadData';

const Workbench = () => {
    const [userData, setUserData] = useState({
        projectList: [],
        issueList: []
    });

    const [userInterface, setUserInterface] = useState({
        displayProjectManager: false,
        displayCreateIssue: false,
        displayClosedIssue: false,
        projectTabs: [],
        selectProject: null,
        selectIssue: null
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

    return (
        <Render
            ui={userInterface}
            handleUi={HandleUi({ userInterface, setUserInterface, userData })}

            userData={userData}
            editProject={handleEditProject}
            deleteProject={handleDeleteProject}
            setIssueStatus={handleSetIssueStatus}
            deleteIssue={handleDeleteIssue}
        />
    );
}

export default Workbench;