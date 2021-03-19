import React from 'react';

const UI = (props) => {
    const { userInterface, setUserInterface } = props;

    const handleToggleProjectManager = () => {
        (userInterface.displayProjectManager === true)
            ? setUserInterface({ ...userInterface, displayProjectManager: false })
            : setUserInterface({ ...userInterface, displayProjectManager: true, selectIssue: null });
    }

    return { handleToggleProjectManager }
}

export default UI;