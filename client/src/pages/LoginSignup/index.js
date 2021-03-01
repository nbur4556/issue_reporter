import React, { useState, useEffect } from 'react';

// Components
import CredentialsForm from '../../components/CredentialsForm';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const userConnection = new ApiConnection('/api/user');

const LoginSignup = () => {
    const [signupActive, setSignupActive] = useState(false);
    const [loginActive, setLoginActive] = useState(false);

    const [credentialsInput, setCredentialsInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    // Clear credentials input state
    useEffect(() => {
        setCredentialsInput({
            username: '',
            password: '',
            confirmPassword: ''
        });
    }, [signupActive, loginActive]);

    // Set which form to display
    const handleSetActive = e => {
        if (e.currentTarget.name === 'loginActive') {
            setSignupActive(false);
            setLoginActive(true);
        }
        else if (e.currentTarget.name === 'signupActive') {
            setLoginActive(false);
            setSignupActive(true);
        }
    }

    // Get input from form
    const handleCredentialsInput = e => {
        setCredentialsInput({ ...credentialsInput, [e.currentTarget.name]: e.currentTarget.value })
    }

    // Create a new user
    const handleSignup = () => {
        userConnection.postQuery({
            body: credentialsInput
        });
    }

    // Log in as existing user
    const handleLogin = () => {

    }

    return (
        <main>
            <section>
                <button name="loginActive" onClick={handleSetActive}>Log In</button>
                <button name="signupActive" onClick={handleSetActive}>Sign Up</button>
            </section>

            {(loginActive) ? <CredentialsForm requireConfirm={false} handleOnChange={handleCredentialsInput} handleSubmit={handleLogin} /> : null}
            {(signupActive) ? <CredentialsForm requireConfirm={true} handleOnChange={handleCredentialsInput} handleSubmit={handleSignup} /> : null}
        </main>
    );
}

export default LoginSignup;