import React, { useState } from 'react';

// Components
import CredentialsForm from '../../components/CredentialsForm';

const LoginSignup = () => {
    const [signupActive, setSignupActive] = useState(false);
    const [loginActive, setLoginActive] = useState(false);

    const handleSetActive = e => {
        if (e.currentTarget.name === 'loginActive') {
            setSignupActive(false);
            setLoginActive(true);
        }
        else if (e.currentTarget.name == 'signupActive') {
            setLoginActive(false);
            setSignupActive(true);
        }
    }

    return (
        <main>
            <section>
                <button name="loginActive" onClick={handleSetActive}>Log In</button>
                <button name="signupActive" onClick={handleSetActive}>Sign Up</button>
            </section>

            {(loginActive) ? <CredentialsForm requireConfirm={false} /> : null}
            {(signupActive) ? <CredentialsForm requireConfirm={true} /> : null}
        </main>
    );
}

export default LoginSignup;