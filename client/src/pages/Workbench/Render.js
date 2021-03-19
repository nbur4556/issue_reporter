import React from 'react';

// Components
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import IssueList from '../../components/IssueList';
import Toolbar from '../../components/Toolbar';

const Render = (props) => {

    return (
        <main>

            <section>

                <Toolbar displayClosedIssue={props.displayClosedIssue} toggleProjectManager={props.toggleProjectManager} />

                <TabBar onClick={props.selectProject} removeTab={props.removeProjectTab} tabData={props.ui.projectTabs.map(project => {
                    return { tabId: project._id, tabName: project.projectName }
                })} />

                <IssueList userData={props.userData} ui={props.ui} selectIssue={props.selectIssue} />

            </section>

            {/* Workbench Details Section */}

            <WorkbenchDetailSection
                showProjectManager={props.ui.displayProjectManager}
                showIssueDetails={props.ui.selectIssue}

                projects={props.userData.projectList}
                addTab={props.addProjectTab}
                editProject={props.editProject}
                deleteProject={props.deleteProject}

                issue={props.userData.issueList[props.ui.selectIssue]}
                toggleStatus={props.setIssueStatus}
                deleteIssue={props.deleteIssue}
            />

        </main>
    );
}

export default Render;