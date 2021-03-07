import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import CredentialsForm from '../../components/CredentialsForm';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const userConnection = new ApiConnection('/api/user');

const LoginSignup = (props) => {

    const [signinState, setSigninState] = useState({
        loginActive: false,
        signupActive: false,
        msg: ''
    });

    const [credentialsInput, setCredentialsInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [redirect, setRedirect] = useState(false);

    // Clear credentials input state
    useEffect(() => {
        setCredentialsInput({
            username: '',
            password: '',
            confirmPassword: ''
        });

        setSigninState({ ...signinState, msg: null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signinState.loginActive, signinState.signupActive]);

    // Set which form to display
    const handleSetActive = e => {
        (e.currentTarget.name === 'loginActive')
            ? setSigninState({ ...signinState, loginActive: true, signupActive: false })
            : setSigninState({ ...signinState, loginActive: false, signupActive: true })
    }

    // Get input from form
    const handleCredentialsInput = e => {
        setCredentialsInput({ ...credentialsInput, [e.currentTarget.name]: e.currentTarget.value })
    }

    // Create a new user
    const handleSignup = e => {
        e.preventDefault();

        userConnection.postQuery({
            body: credentialsInput
        }).then((result) => {
            (result.data.authToken)
                ? signinSuccessful(result.data.authToken)
                : signinFailed('Error: User not created.');
        }).catch(err => signinFailed('Error: User not created.'));
    }

    // Log in as existing user
    const handleLogin = e => {
        e.preventDefault();

        userConnection.postQuery({
            urlExtension: `/${credentialsInput.username}`,
            body: credentialsInput
        }).then((result) => {
            (result.data.authToken)
                ? signinSuccessful(result.data.authToken)
                : signinFailed('Error: Login not successful.');
        }).catch(err => signinFailed('Error: Login not successful.'));
    }

    const signinSuccessful = (authToken) => {
        localStorage.setItem('authToken', authToken);
        props.updateAuthToken();
        setRedirect(true);
    }

    const signinFailed = message => {
        localStorage.removeItem('authToken');
        props.updateAuthToken();
        setSigninState({ ...signinState, msg: message });
        setRedirect(false);
    }

    return (
        <main>
            <section>
                <button name="loginActive" onClick={handleSetActive}>Log In</button>
                <button name="signupActive" onClick={handleSetActive}>Sign Up</button>
            </section>

            {/* Input Forms */}
            {(signinState.loginActive) ? <CredentialsForm requireConfirm={false} handleOnChange={handleCredentialsInput} handleSubmit={handleLogin} /> : null}
            {(signinState.signupActive) ? <CredentialsForm requireConfirm={true} handleOnChange={handleCredentialsInput} handleSubmit={handleSignup} /> : null}

            {/* Messages */}
            {(signinState.msg) ? <p>{signinState.msg}</p> : null}

            {/* Redirects */}
            {(redirect) ? <Redirect to='/workbench' /> : null}
        </main>
    );
}

export default LoginSignup;