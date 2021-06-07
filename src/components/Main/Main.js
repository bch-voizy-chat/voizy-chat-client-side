import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import About from "../../pages/About";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import NewAudio from "../../pages/NewAudio";
import PageNotFound from "../../pages/PageNotFound";
import Signup from "../../pages/Signup";
import SingleThread from "../../pages/SingleThread";
import UserAccount from "../../pages/UserAccount";
import PrivateRoute from "./PrivateRoute";

const Main = () => {
	const [threads, setThreads] = useState([]);
	const fetchData = async () => {
		try {
			let res = await axios.get(
				"https://us-central1-voizy-chat.cloudfunctions.net/voizyChat/threads"
			);
			setThreads(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(fetchData, []);

	return (
		<main>
			<Switch>
				<Route exact path='/'>
					<Home threads={threads} />
				</Route>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<PrivateRoute exact path='/new' component={NewAudio} />
				<PrivateRoute exact path='/account' component={UserAccount} />
				<Route exact path='/conversation/:id' component={SingleThread} />
				<Route path='/about' component={About} />
				<Route path='*' component={PageNotFound} />
			</Switch>
		</main>
	);
};

export default Main;
