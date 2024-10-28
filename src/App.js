import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apolloClient'; 
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <ApolloProvider client={createApolloClient()}>
            {isLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </ApolloProvider>
    );
};

export default App;
