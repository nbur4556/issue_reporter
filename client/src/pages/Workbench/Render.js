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

            <IssueList ui={ui} userData={userData} uiDispatcher={uiDispatcher} />

            <WorkbenchDetailSection
                ui={ui}
                userData={userData}
                uiDispatcher={uiDispatcher}
                issueInterface={props.issueInterface}
                projectInterface={props.projectInterface}
                handleLoadData={props.handleLoadData}
            />
        </main>
    );
}

export default Render;