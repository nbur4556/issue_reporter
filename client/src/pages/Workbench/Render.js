import React from 'react';

// Components
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import IssueList from '../../components/IssueList';
import Toolbar from '../../components/Toolbar';

const Render = (props) => {
    const { handleUi, ui, userData } = props;

    return (
        <main className="workbench-page">

            <section>

                <Toolbar ui={handleUi} />

                <TabBar ui={handleUi}
                    tabData={ui.projectTabs.map(project => {
                        return { tabId: project._id, tabName: project.projectName }
                    })}
                />

                <IssueList userData={userData} ui={ui} selectIssue={handleUi.handleSelectIssue} />

            </section>

            <WorkbenchDetailSection
                ui={ui}

                // Project Manager Props
                projects={userData.projectList}
                addTab={handleUi.handleAddProjectTab}
                editProject={props.editProject}
                deleteProject={props.deleteProject}

                // Create Issue Props
                loadIssues={props.loadIssues}

                // Select Issue Props
                issue={userData.issueList[props.ui.selectIssue]}
                toggleStatus={props.setIssueStatus}
                deleteIssue={props.deleteIssue}

                loadData={props.loadData}
            />

        </main>
    );
}

export default Render;