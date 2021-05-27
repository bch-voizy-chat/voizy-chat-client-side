import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "../../pages/About";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import NewAudio from "../../pages/NewAudio";
import PageNotFound from "../../pages/PageNotFound";
import Signup from "../../pages/Signup";
import SingleThread from "../../pages/SingleThread";
import PrivateRoute from "./PrivateRoute";

const Main = () => {
	return (
		<main>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<PrivateRoute exact path='/new' component={NewAudio} />
				<Route exact path='/conversation/:id' component={SingleThread} />
				<Route path='/about' component={About} />
				<Route path='*' component={PageNotFound} />
			</Switch>
		</main>
	);
};

export default Main;
