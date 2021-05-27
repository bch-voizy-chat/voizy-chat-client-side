import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
