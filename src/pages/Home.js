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
			<Link
				to='/new'
				className='squishy new-audio-link'
				title='Start a conversation.'
			>
				<svg
					role='img'
					version='1.1'
					className='new-audio-link__add-icon'
					xmlns='http://www.w3.org/2000/svg'
					x='0px'
					y='0px'
					viewBox='0 0 60 60'
				>
					<title>New audio icon</title>
					<line class='st0' x1='30' y1='5' x2='30' y2='55' />
					<line class='st0' x1='5' y1='30' x2='55' y2='30' />
				</svg>
			</Link>

			<p>
				All threads; {userLoggedIn ? "User is logged in" : "No users logged in"}
			</p>

			{threadList}
		</div>
	);
};

export default Home;
