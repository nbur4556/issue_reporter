import React, { useState, useEffect } from 'react';
import './style.css'

// Components
import CredentialsForm from '../../components/CredentialsForm';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const userConnection = new ApiConnection('/api/user');

const LoginSignup = (props) => {

    const [signinState, setSigninState] = useState({
        loginActive: true,
        signupActive: false,
        msg: ''
    });

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
        setSigninState({ ...signinState, msg: null });
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
    }

    const signinFailed = message => {
        localStorage.removeItem('authToken');
        setSigninState({ ...signinState, msg: message });
        props.updateAuthToken();
    }

    return (
        <main className="login-signup-page">

            <section className="title-section">
                <h1>Issue Reporter</h1>
            </section>

            <section className="toggle-section">
                {(signinState.signupActive) ? <button className="link-button" name="loginActive" onClick={handleSetActive}>Log In</button> : null}
                {(signinState.loginActive) ? <button className="link-button" name="signupActive" onClick={handleSetActive}>Sign Up</button> : null}
            </section>

            {/* Input Forms */}
            <section className="input-section">
                {(signinState.loginActive) ? <CredentialsForm requireConfirm={false} handleOnChange={handleCredentialsInput} handleSubmit={handleLogin} /> : null}
                {(signinState.signupActive) ? <CredentialsForm requireConfirm={true} handleOnChange={handleCredentialsInput} handleSubmit={handleSignup} /> : null}
            </section>

            {/* Messages */}
            <section className="message-section">
                {(signinState.msg) ? <p>{signinState.msg}</p> : null}
                {(signinState.signupActive)
                    ? <ul>
                        <h5>Minimum Password Requirements:</h5>
                        <li>At least 8 characters long</li>
                        <li>At least one capital letter</li>
                        <li>At least one lower case letter</li>
                        <li>At least one number</li>
                    </ul>
                    : null}
            </section>
        </main>
    );
}

export default LoginSignup;