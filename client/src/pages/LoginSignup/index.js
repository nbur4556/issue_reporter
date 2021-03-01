import React, { useState, useEffect } from 'react';

// Components
import CredentialsForm from '../../components/CredentialsForm';

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
        console.log(e.currentTarget.name);
        console.log(e.currentTarget.value);

        setCredentialsInput({ ...credentialsInput, [e.currentTarget.name]: e.currentTarget.value })
    }

    return (
        <main>
            <section>
                <button name="loginActive" onClick={handleSetActive}>Log In</button>
                <button name="signupActive" onClick={handleSetActive}>Sign Up</button>
            </section>

            {(loginActive) ? <CredentialsForm requireConfirm={false} handleOnChange={handleCredentialsInput} /> : null}
            {(signupActive) ? <CredentialsForm requireConfirm={true} handleOnChange={handleCredentialsInput} /> : null}
        </main>
    );
}

export default LoginSignup;