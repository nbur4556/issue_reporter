import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import CredentialsForm from '../../components/CredentialsForm';

// Utilities
import ApiConnection from '../../utils/ApiConnection.js';
const userConnection = new ApiConnection('/api/user');

const LoginSignup = (props) => {

    const [loginState, setLoginState] = useState({
        isActive: false,
        msg: ''
    });

    const [signupState, setSignupState] = useState({
        isActive: false,
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

        setSignupState({ ...signupState, msg: null });
        setLoginState({ ...loginState, msg: null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signupState.isActive, loginState.isActive]);

    // Set which form to display
    const handleSetActive = e => {
        if (e.currentTarget.name === 'loginActive') {
            setSignupState({ ...signupState, isActive: false });
            setLoginState({ ...loginState, isActive: true });
        }
        else if (e.currentTarget.name === 'signupActive') {
            setLoginState({ ...loginState, isActive: false });
            setSignupState({ ...signupState, isActive: true });
        }
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
            if (result.data.authToken) {
                signinSuccessful(result.data.authToken);
            }
            else {
                signupFailed();
            }
        }).catch(err => signupFailed());
    }

    // Log in as existing user
    const handleLogin = e => {
        e.preventDefault();

        userConnection.postQuery({
            urlExtension: `/${credentialsInput.username}`,
            body: credentialsInput
        }).then((result) => {
            if (result.data.authToken) {
                signinSuccessful(result.data.authToken);
            }
            else {
                loginFailed();
            }
        }).catch(err => loginFailed());
    }

    const signinSuccessful = (authToken) => {
        localStorage.setItem('authToken', authToken);
        props.updateAuthToken();
        setRedirect(true);
    }

    const loginFailed = () => {
        localStorage.removeItem('authToken');
        setLoginState({ ...loginState, msg: 'Error: Login not successful.' });
        setRedirect(false);
    }

    const signupFailed = () => {
        localStorage.removeItem('authToken');
        setSignupState({ ...signupState, msg: 'Error: User not created.' });
        setRedirect(false);
    }

    return (
        <main>
            <section>
                <button name="loginActive" onClick={handleSetActive}>Log In</button>
                <button name="signupActive" onClick={handleSetActive}>Sign Up</button>
            </section>

            {/* Input Forms */}
            {(loginState.isActive) ? <CredentialsForm requireConfirm={false} handleOnChange={handleCredentialsInput} handleSubmit={handleLogin} /> : null}
            {(signupState.isActive) ? <CredentialsForm requireConfirm={true} handleOnChange={handleCredentialsInput} handleSubmit={handleSignup} /> : null}

            {/* Messages */}
            {(signupState.msg) ? <p>{signupState.msg}</p> : null}
            {(loginState.msg) ? <p>{loginState.msg}</p> : null}

            {/* Redirects */}
            {(redirect) ? <Redirect to='/workbench' /> : null}
        </main>
    );
}

export default LoginSignup;