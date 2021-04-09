import React, { useContext } from 'react';

// Components
import WorkbenchNavigation from '../../components/WorkbenchNavigation';
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import IssueList from '../../components/IssueList';
import Toolbar from '../../components/Toolbar';
import LogoutButton from '../../components/LogoutButton';

const Render = (props) => {
    const { uiDispatcher } = props;

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

            <IssueList uiDispatcher={uiDispatcher} />

            <WorkbenchDetailSection
                uiDispatcher={uiDispatcher}
                issueInterface={props.issueInterface}
                projectInterface={props.projectInterface}
                handleLoadData={props.handleLoadData}
            />
        </main>
    );
}

export default Render;