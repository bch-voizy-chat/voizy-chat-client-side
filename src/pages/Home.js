import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

import Thread from "../components/Main/Thread";

const Home = () => {
	const { currentUser } = useAuth();
	const userLoggedIn = Object.keys(currentUser).length;
	/** [1,2,3] for dev purpose */
	const [thread, setThreads] = useState([1, 2, 3]);

	const threadList = thread.map((thread) => {
		return <Thread thread={thread} />;
	});

	return (
		<div>
			<Link to='/new' className='btn--link-newAudio'>
				Start a thread
			</Link>
			<p>
				All threads;{" "}
				{userLoggedIn
					? currentUser.username + " is logged in"
					: "No users logged in"}
			</p>

			{threadList}
		</div>
	);
};

export default Home;
