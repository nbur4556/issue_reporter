import React, { useState } from 'react';

const CreateProject = () => {
    const [formInput, setFormInput] = useState({
        projectName: ''
    });

    return (
        <main>
            <form>
                <label htmlFor="project-name">
                    <input id="project-name" name="project-name" />
                </label>
            </form>
        </main>
    );
}

export default CreateProject;