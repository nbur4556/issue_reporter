import React, { useContext } from 'react';

// Components
import WorkbenchNavigation from '../../components/WorkbenchNavigation';
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import IssueList from '../../components/IssueList';
import Toolbar from '../../components/Toolbar';
import LogoutButton from '../../components/LogoutButton';

const Render = ({ uiDispatcher }) => {

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

            <Toolbar uiDispatcher={uiDispatcher} />

            <IssueList ui={ui} uiDispatcher={uiDispatcher} />

            <WorkbenchDetailSection
                ui={ui}
                uiDispatcher={uiDispatcher}
                issueInterface={props.issueInterface}
                projectInterface={props.projectInterface}
                handleLoadData={props.handleLoadData}
            />
        </main>
    );
}

export default Render;