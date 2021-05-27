import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isLoggedIn } = useAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				return isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { message: "user not logged in", status: 400 },
						}}
					/>
				);
			}}
		></Route>
	);
};

export default PrivateRoute;
