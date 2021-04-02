import React from 'react';

const LogoutButton = ({ buttonText = "Log Out" }) => {
    const logout = () => {
        console.log('logout');
    }

    return (
        <button onClick={logout}>{buttonText}</button>
    );
}

export default LogoutButton;