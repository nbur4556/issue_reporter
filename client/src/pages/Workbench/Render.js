import React from 'react';

// Components
import WorkbenchNavigation from '../../components/WorkbenchNavigation';
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import IssueList from '../../components/IssueList';
import Toolbar from '../../components/Toolbar';
import LogoutButton from '../../components/LogoutButton';

const Render = (props) => {
    return (
        <main className="workbench-page">

            <WorkbenchNavigation>
                <TabBar />
                <LogoutButton buttonText="Sign Out"></LogoutButton>
            </WorkbenchNavigation>

            <Toolbar />

            <IssueList issueInterface={props.issueInterface} />

            <WorkbenchDetailSection
                issueInterface={props.issueInterface}
                projectInterface={props.projectInterface}
                handleLoadData={props.handleLoadData}
            />
        </main>
    );
}

export default Render;