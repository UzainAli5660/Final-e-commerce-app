import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Add state for error handling
    const navigate = useNavigate();

    const handleLogInWithGoogle = async () => {
        try {
            console.log("Google Login Clicked");
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            const result = await signInWithPopup(auth, provider);
            console.log("Login Success:", result);
            const user = result.user;
            console.log("User:", user);

            navigate('/Search'); 
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
            setError("Google Sign-In failed. Please try again."); // Set error message
        }
    };

    const handleUserSignIn = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/Search'); // Navigate after successful login
        } catch (error) {
            console.error("Error during Email/Password Sign-In:", error);
            if (error.code === 'auth/invalid-email') {
                setError("Invalid email address format.");
            } else if (error.code === 'auth/user-not-found') {
                setError("No user found with this email.");
            } else if (error.code === 'auth/wrong-password') {
                setError("Incorrect password.");
            } else {
                setError("Email/Password sign-in failed. Please check your credentials.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>
                <form>
                    <label htmlFor="email" className="login-label">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="login-input" 
                    />

                    <label htmlFor="password" className="login-label">Password:</label>
                    <input
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password" 
                        name="password"
                        className="login-input" 
                    />
                    <Link to="/Signin" className="mr-5 hover:text-gray-900">
                        Don't have an account? Sign Up
                    </Link>
                    <button type="button" className="login-button" onClick={handleUserSignIn} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
                    <h1 className='text-center mt-3'>Or</h1>
                    <button
                        onClick={handleLogInWithGoogle}
                        type="button" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing in with Google..." : "Login with Google"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
