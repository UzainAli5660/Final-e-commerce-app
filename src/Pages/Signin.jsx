import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebase';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleSignUpWithGoogle = async () => {
        try {
            console.log("Google Sign-Up Clicked");
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            const result = await signInWithPopup(auth, provider);
            console.log("Sign-Up Success:", result);
            const user = result.user;
            console.log("User:", user);

            navigate('/Search'); 
        } catch (error) {
            console.error("Error during Google Sign-Up:", error);
            setError("Google Sign-Up failed. Please try again."); 
        }
    };

    const handleUserSignUp = async () => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/Login'); 
        } catch (error) {
            console.error("Error during Email/Password Sign-Up:", error);
            if (error.code === 'auth/invalid-email') {
                setError("Invalid email address format.");
            } else if (error.code === 'auth/email-already-in-use') {
                setError("Email is already in use.");
            } else if (error.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Email/Password sign-up failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Sign Up</h2>
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
                    <Link to="/Login" className="mr-5 hover:text-gray-900">
                        Already have an account? Login
                    </Link>
                    <button type="button" className="login-button" onClick={handleUserSignUp} disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
                    <h1 className='text-center mt-3'>Or</h1>
                    <button
                        onClick={handleSignUpWithGoogle}
                        type="button" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing up with Google..." : "Sign Up with Google"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
