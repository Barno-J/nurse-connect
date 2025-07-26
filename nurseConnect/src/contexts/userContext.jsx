import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const dispatch = useDispatch();
	const { user, token } = useSelector((state) => state.user);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<UserContext.Provider value={{ token, user, logout: handleLogout }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);