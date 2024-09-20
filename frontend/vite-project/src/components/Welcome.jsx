import React from 'react';

const Welcome = ({ user, onLogout }) => {
    return (
        <>
            <h2>Welcome, {user.email}!</h2>
            <button onClick={onLogout}>Logout</button>
        </>
    );
};

export default Welcome;
