import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem('token') || '');
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
		}
	}, [token]);

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
	}, [user]);

	const logout = () => {
		setToken('');
		setUser(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	};

	return (
		<UserContext.Provider value={{ token, user, setToken, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);