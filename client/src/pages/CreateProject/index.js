import React, { useState } from 'react';

const CreateProject = () => {
    const [projectData, setProjectData] = useState({
        projectName: ''
    });

    const handleSetProjectData = e => {
        const input = e.currentTarget;
        setProjectData({ ...projectData, [input.name]: input.value })
    }

    return (
        <main>
            <form>
                <label htmlFor="projectName">
                    Name:
                    <input id="projectName" name="projectName" type="text" onChange={handleSetProjectData} />
                </label>
            </form>
        </main>
    );
}

export default CreateProject;