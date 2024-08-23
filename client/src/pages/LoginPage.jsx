// Importing Modules/Packages
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const validate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/AuthenticateUser');
            if(!res.ok) console.log(res);
        }
        catch(error) {
            console.error('Error sending data');
            throw error;
        }
    }
    return (
        <main id="position-container">
            <div className="form-container">
                <form onSubmit={validate} action="#">
                    <h2>Login</h2>
                    <div className="input-container">
                        <box-icon name='user'></box-icon>
                        <input onInput={({ target }) => setUsername(target.value)} autoComplete="off" type="text" id="username" required />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-container">
                        <box-icon name='lock-alt'></box-icon>
                        <input onInput={({ target }) => setPassword(target.value)} type="text" id="password" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="signInAssistance-container">
                        <label htmlFor="RememberMe"><input type="checkbox" id="RememberMe" />Remember Me</label>
                        <Link id="forgotPassword" to='#'>Forgot Password</Link>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register">
                        <p>Don't have an account? <Link to='#'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}