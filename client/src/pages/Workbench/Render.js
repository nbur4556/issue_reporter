import React from 'react';

// Components
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import ProjectManager from '../../components/ProjectManager';
import IssueDetails from '../../components/IssueDetails';
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

            {(props.ui.displayProjectManager === true)
                ? <WorkbenchDetailSection component={ProjectManager}
                    projects={props.userData.projectList}
                    addTab={props.addProjectTab}
                    editProject={props.editProject}
                    deleteProject={props.deleteProject}
                />
                : null}

            {(props.ui.selectIssue !== null)
                ? <WorkbenchDetailSection component={IssueDetails}
                    issue={props.userData.issueList[props.ui.selectIssue]}
                    toggleStatus={props.setIssueStatus}
                    deleteIssue={props.deleteIssue} />
                : null
            }

        </main>
    );
}

export default Render;