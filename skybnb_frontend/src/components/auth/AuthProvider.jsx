'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { createContext } from "react";
import { useContext } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    setUser: () => { },
    login: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (loginData) => {
        try {
            const response = await fetch('http://localhost:8000/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data?.error.message);
            }
            const data = await response.json();
            const token = data.data.accessToken;
            Cookies.set('token', token);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Error fetching JWT:', error);
            throw error;
        }
    }

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth }

