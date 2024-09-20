import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';

const App = () => {
    const [user, setUser] = useState(null);

    // Check if there is a token in localStorage on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode token to get user info (if you want to store additional info)
            const userInfo = JSON.parse(atob(token.split('.')[1])); // This is a simple decode
            setUser({ email: userInfo.email, token });
        }
    }, []);

    const handleSignup = async (userData) => {
        try {
            const response = await fetch('http://localhost:8000/api/user/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error during signup.');
        }
    };

    const handleLogin = async (userData) => {
        try {
            const response = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                setUser({ email: data.user.email, token: data.token });
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error during login.');
        }
    };

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div>
            {!user ? (//if user is not logged in, 
                <>
                    <Signup onSignup={handleSignup} />
                    <Login onLogin={handleLogin} />
                </>
            ) : (
                <Welcome user={user} onLogout={handleLogout} />
            )}
        </div>
    );
};

export default App;
