import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const LogoutButton = ({ buttonText = "Log Out" }) => {
    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        localStorage.removeItem('authToken');
        setLoggedOut(true);
    }

    return (
        <button onClick={logout} >
            { buttonText}
            { (loggedOut) ? <Redirect to='/' /> : null}
        </button >
    );
}

export default LogoutButton;