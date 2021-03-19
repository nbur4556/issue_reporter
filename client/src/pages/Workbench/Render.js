import React from 'react';
import { Link } from 'react-router-dom';

// Components
import WorkbenchDetailSection from '../../components/WorkbenchDetailSection';
import TabBar from '../../components/TabBar';
import ProjectManager from '../../components/ProjectManager';
import IssueBar from '../../components/IssueBar';
import IssueDetails from '../../components/IssueDetails';

const Render = (props) => {

    return (
        <main>

            {/* Issue Section */}

            <section>

                {/* TOOLBAR COMPONENT */}

                <section>
                    <label htmlFor="toggleClosedIssues">
                        Show Closed Issues:
                        <input id="toggleClosedIssues" name="toggleClosedIssues" type="checkbox" onChange={props.displayClosedIssue} />
                    </label>
                    <Link to="/create-issue">Create Issue</Link>
                    <Link to="/create-project">Create Project</Link>

                    <button onClick={props.toggleProjectManager}>Toggle Project Manager</button>
                </section>

                <TabBar onClick={props.selectProject}
                    removeTab={props.removeProjectTab}
                    tabData={props.ui.projectTabs.map(project => {
                        return { tabId: project._id, tabName: project.projectName }
                    })}
                />

                {/* ISSUE LIST COMPONENT */}

                <section className="issueListSection">
                    {props.userData.issueList.map((issue, index) => {
                        return (issue.isOpen === false && props.ui.displayClosedIssue === false)
                            ? null
                            : <IssueBar onClick={props.selectIssue} key={index} index={index} title={issue.name} />;
                    })}
                </section>

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