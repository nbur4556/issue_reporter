import React from 'react';

// Components
import WorkbenchNavigation from '../../components/WorkbenchNavigation';
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import IssueList from '../../components/IssueList';
import Toolbar from '../../components/Toolbar';
import LogoutButton from '../../components/LogoutButton';

const Render = (props) => {
    const { ui, userData, uiDispatcher } = props;

    return (
        <main className="workbench-page">

            <WorkbenchNavigation>

                <TabBar uiDispatcher={uiDispatcher}
                    tabData={ui.projectTabs.map(project => {
                        return { tabId: project._id, tabName: project.projectName }
                    })}
                />

                <LogoutButton buttonText="Sign Out"></LogoutButton>

            </WorkbenchNavigation>

            <Toolbar ui={ui} uiDispatcher={uiDispatcher} />

            <IssueList userData={userData} ui={ui} uiDispatcher={uiDispatcher} />

            <WorkbenchDetailSection
                ui={ui}
                userData={userData}
                uiDispatcher={uiDispatcher}
                issueInterface={props.issueInterface}
                projectInterface={props.projectInterface}

                // Project Manager Props

                editProject={props.editProject}
                deleteProject={props.deleteProject}

                // Create Issue Props
                loadIssues={props.loadIssues}

                // Select Issue Props
                issue={userData.issueList[props.ui.selectIssue]}
                toggleStatus={props.setIssueStatus}
                deleteIssue={props.deleteIssue}

                handleLoadData={props.handleLoadData}
                projects={userData.projectList}
            />
        </main>
    );
}

export default Render;