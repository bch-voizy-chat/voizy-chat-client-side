import React, { createContext, useContext, useState } from "react";
import * as Cookies from "js-cookie";

export const setUserCookie = (user) => {
	Cookies.remove("user");
	Cookies.set("user", user, { expires: 14 });
};

export const getUserCookie = () => {
	const userCookie = Cookies.get("user");

	if (userCookie === undefined) {
		return {};
	} else {
		return JSON.parse(userCookie);
	}
};

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(getUserCookie());

	const signup = (email, password, username) => {
		/** create user then redirect user to login page */
		return;
	};

	const value = {
		currentUser,
		signup,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
