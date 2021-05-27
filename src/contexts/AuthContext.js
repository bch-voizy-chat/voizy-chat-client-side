import React, { createContext, useContext, useState } from "react";
import * as Cookies from "js-cookie";
import axios from "axios";

const setUserCookie = (user) => {
	Cookies.remove("user");
	Cookies.set("user", user, { expires: 14 });
};

const getUserCookie = () => {
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
		const data = {
			email: email,
			password: password,
			username: username,
		};
		/** server signup url */
		const url = "";

		return axios
			.post(url, data)
			.then(() => {
				return "";
			})
			.catch((err) => {
				if (err.response) {
					// client received an error response (5xx, 4xx)
					return "Account/username exists already.";
				} else if (err.request) {
					// client never received a response, or request never left
					return "An error occured! Server cannot be reached.";
				} else {
					// anything else
					return "An error occured! Please try again.";
				}
			});
	};

	const login = (email, password) => {
		const params = {
			email: email,
			password: password,
		};
		/** server login url */
		const url = "https://randomuser.me/api/";

		return axios
			.get(url, { params })
			.then((resp) => {
				// for dev purpose
				let user = {
					email: resp.data.results[0].email,
					password: resp.data.results[0].login.password,
					username: resp.data.results[0].login.username,
				};
				setUserCookie(user);
				setCurrentUser(user);
				return "";
			})
			.catch((err) => {
				if (err.response) {
					// client received an error response (5xx, 4xx)
					return "An error occured!";
				} else if (err.request) {
					// client never received a response, or request never left
					return "An error occured! Server cannot be reached.";
				} else {
					// anything else
					return "An error occured! Please try again.";
				}
			});
	};

	const logout = () => {
		Cookies.remove("user");
		console.log("logout");
	};

	const value = {
		currentUser,
		signup,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
