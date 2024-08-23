// Importing Modules/Packages
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    // Retrieving the value of a cookie by its name from the document's cookies.
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const validate = async (e) => {
        e.preventDefault();
        try {
            // const res = await fetch('http://127.0.0.1:5000/api/AuthenticateUser', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-CSRFToken': getCookie('csrftoken')
            //     },
            //     body: JSON.stringify({ Username, Password }),
            // });
            const res = await fetch('http://localhost:5000/api/AuthenticateUser', {
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) {
                console.log('Response not OK:', res);
            }
            else {
                const data = await res.json();
                console.log(data);
                // You can handle successful login here, e.g., redirect the user
            }
        }
        catch (error) {
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
                    <div>

                        <p>kifnfn</p>
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