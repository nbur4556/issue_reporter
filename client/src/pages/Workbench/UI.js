const UI = (props) => {
    const { userInterface, setUserInterface, userData } = props;

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

    return {
        handleToggleProjectManager,
        handleAddProjectTab,
        handleRemoveProjectTab,
        handleSelectProject,
        handleSelectIssue,
        handleDisplayClosedIssue
    }
}

export default UI;