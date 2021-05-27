import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();
	const userLoggedIn = Object.keys(currentUser).length;
	return (
		<Route
			{...rest}
			render={(props) => {
				return userLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}
		></Route>
	);
};

export default PrivateRoute;
