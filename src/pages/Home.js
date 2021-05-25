import React, { useState } from "react";

import Thread from "../components/Main/Thread";

const Home = () => {
	/** [1,2,3] for dev purpose */
	const [thread, setThreads] = useState([1, 2, 3]);

	const threadList = thread.map((thread) => {
		return <Thread thread={thread} />;
	});

	return (
		<div>
			<p>All threads</p>
			{threadList}
		</div>
	);
};

export default Home;
