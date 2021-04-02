import React from 'react';

const LogoutButton = () => {
    const logout = () => {
        console.log('logout');
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}

export default LogoutButton;